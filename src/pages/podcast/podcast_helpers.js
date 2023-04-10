/* eslint-disable no-console */
import axios from 'axios';

import { ACTIONS } from '../../app_helpers';
import { CORS_URL } from '../../utils/globalConstants';

/**
* Removes CDATA and related characters
* @param {String} value
* @returns {String}
*/
const getFormattedValue = value => {
	return value?.trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '');
};

/**
* Transforms episode array into object and then returns array of objects
* @param {Array} episodeList List of episodes
* @param {Object} episode object with episode information
* @returns {Array}
*/
const formatDataToObject = (episodeList, episode) => {
	const episodeArray = [ ...episode ];
	const objectEpisode = episodeArray.reduce((accum, value) => ({ ...accum, [value.localName || value.nodeName]: getFormattedValue(value.innerHTML) }), {});
	return [ ...episodeList, objectEpisode ];
};

/**
* @param {String} id podcastId
* @param {String} url url to get the info from
* @param {Object} localPodcastInfo object with podcast information from local storage
* @param {Function} setEpisodeList function that sets episodes variable state
* @param {Function} dispatchIsLoading sets is Loading to false/true
* @param {Function} saveDataByIdToLocalStorage saves data to local storage by podcast id
* @returns {VoidFunction}
*/
const getPodcastByUrl = async (id, url, localPodcastInfo, setEpisodeList, dispatchIsLoading, saveDataByIdToLocalStorage) => {
	dispatchIsLoading({ type: ACTIONS.SET_LOADING_PARSER, payload: true });
	try {
		const response = await axios.get(`${CORS_URL}/raw?url=${url}`, { 'Content-Type': 'application/xml; charset=utf-8' });
		const parser = new DOMParser();
		const xml = parser.parseFromString(response.data, 'text/xml');
		const dataHttp = xml.getElementsByTagName('item');
		const arrayData = [ ...dataHttp ];
		const formattedEpisodeList = arrayData.map(item => item.children).reduce(formatDataToObject, []);
		const mergedPodcast = { ...localPodcastInfo, episodes: formattedEpisodeList };
		setEpisodeList(formattedEpisodeList);
		saveDataByIdToLocalStorage(mergedPodcast, id);
	} catch (error) {
		console.log(error);
	} finally {
		dispatchIsLoading({ type: ACTIONS.SET_LOADING_PARSER, payload: false });
	}
};

export { getPodcastByUrl };
