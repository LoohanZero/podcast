/* eslint-disable no-console */
import axios from 'axios';

// ----------------------- VARIABLES --------------------------------
const SIZE_IMAGE = 170;

// ----------------------- FUNCTIONS --------------------------------
/**
* @param {Boolean} isLoading podcasts loading flag
* @param {Function} dispatchPodcastsState function that sets podcasts variable state
* @param {Function} savePodcastsToLocalStorage function that saves podcasts to local storage
* @returns {VoidFunction}
*/
const getPodcasts = async (setIsLoading, setPodcasts, savePodcastsToLocalStorage) => {
	setIsLoading(true);
	try {
		const response = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
		const data = response.data.feed.entry;
		setPodcasts(data);
		savePodcastsToLocalStorage(data);
	} catch (error) {
		console.log(error);
	} finally {
		setIsLoading(false);
	}
};

/**
* Returns string with image url
* @param {Array} images array with images
* @returns {String}
*/
const getPodcastImage = images => {
	const imageObject = images.filter(image => Number(image.attributes.height) === SIZE_IMAGE)[0];
	return imageObject.label;
};

/**
* Returns object that matchs search criteria
* @param {Object} podcast Object with podcast information
* @param {String} searchValue String with search value
* @returns {Object}
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

export { filterPodcast, getPodcastImage, getPodcasts };
