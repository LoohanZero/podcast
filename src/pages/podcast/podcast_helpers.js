/* eslint-disable no-console */
import axios from 'axios';

import { ACTIONS } from '../../app_helpers';

/**
* @param {String} id podcastId
* @param {Object} localPodcastInfo object with podcast information from local storage
* @param {Function} setEpisodeList function that sets episodes variable state
* @param {Function} dispatchIsLoading sets is Loading to false/true
* @param {Function} saveDataByIdToLocalStorage saves data to local storage by podcast id
* @returns {VoidFunction}
*/
const getEpisodesByPodcastId = async (id, localPodcastInfo, setEpisodeList, dispatchIsLoading, saveDataByIdToLocalStorage) => {
	dispatchIsLoading({ type: ACTIONS.SET_LOADING_PARSER, payload: true });
	try {
		const response = await axios.get(`${`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=2000`}`);
		const data = response.data.results;
		data.shift();
		const mergedPodcast = { ...localPodcastInfo, episodes: data };
		setEpisodeList(data);
		saveDataByIdToLocalStorage(mergedPodcast, id);
	} catch (error) {
		console.log(error);
	} finally {
		dispatchIsLoading({ type: ACTIONS.SET_LOADING_PARSER, payload: false });
	}
};

export { getEpisodesByPodcastId };
