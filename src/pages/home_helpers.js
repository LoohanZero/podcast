/* eslint-disable no-console */
import axios from 'axios';

// ----------------------- VARIABLES --------------------------------
const SIZE_IMAGE = 170;

const ACTIONS = {
	SET_PODCASTS: 'SET_PODCASTS',
	TOGGLE_IS_LOADING: 'TOGGLE_IS_LOADING',
	SET_SEARCH_VALUE: 'SET_SEARCH_VALUE'
};

const initialState = {
	podcasts: null,
	isLoading: false,
	searchValue: ''
};

// ----------------------- FUNCTIONS --------------------------------
/**
* Returns Object with new state
* @param {Object} state Component state object
* @param {Object} action Object with type of action and payload
* @return {Object}
*/
const podcastsReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
			case ACTIONS.SET_PODCASTS:
				return { ...state, podcasts: payload };
			case ACTIONS.TOGGLE_IS_LOADING:
				return { ...state, isLoading: true };
			case ACTIONS.SET_SEARCH_VALUE:
				return { ...state, searchValue: payload };
			default:
				return state;
	}
};

/**
* @param {Boolean} isLoading podcasts loading flag
* @param {Function} dispatchPodcastsState function that sets podcasts variable state
* @param {Function} savePodcastsToLocalStorage function that saves podcasts to local storage
* @return {VoidFunction}
*/
const getPodcasts = async (isLoading, dispatchPodcastsState, savePodcastsToLocalStorage) => {
	dispatchPodcastsState({ type: ACTIONS.TOGGLE_IS_LOADING });
	try {
		const response = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
		const data = response.data.feed.entry;
		dispatchPodcastsState({ type: ACTIONS.SET_PODCASTS, payload: data });
		savePodcastsToLocalStorage(data);
	} catch (error) {
		console.log(error);
	} finally {
		isLoading && dispatchPodcastsState({ type: ACTIONS.TOGGLE_IS_LOADING });
	}
};

/**
* Returns string with image url
* @param {Array} images array with images
* @return {String}
*/
const getPodcastImage = images => {
	const imageObject = images.filter(image => Number(image.attributes.height) === SIZE_IMAGE)[0];
	return imageObject.label;
};

/**
* Returns object that matchs search criteria
* @param {Object} podcast Object with podcast information
* @param {String} searchValue String with search value
* @return {Object}
*/
const filterPodcast = (podcast, searchValue) => {
	const searchableInfo = podcast['im:name'].label + ' ' + podcast['im:artist'].label;

	try {
		const regexp = new RegExp(searchValue, 'i');
		return regexp.test(searchableInfo);
	} catch (error) {
		console.log(error);
		return false;
	}
};

export { ACTIONS, filterPodcast, getPodcastImage, getPodcasts, initialState, podcastsReducer };
