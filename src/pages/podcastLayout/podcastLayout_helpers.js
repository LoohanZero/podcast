/* eslint-disable no-console */
import axios from 'axios';

import { ACTIONS } from '../../app_helpers';
import { CORS_URL } from '../../utils/globalConstants';
/**
* @param {String} id podcast Id
* @param {Object} localPodcastInfo podcast information saved in local storage
* @param {Function} setPodcast podcast state setter
* @param {Function} dispatchIsLoading unction that sets loading variable state
* @param {Function} savePodcastsToLocalStorage function that saves podcasts to local storage
* @returns {VoidFunction}
*/
const getPodcastById = async (id, localPodcastInfo, setPodcast, dispatchIsLoading, saveDataByIdToLocalStorage) => {
	dispatchIsLoading({ type: ACTIONS.SET_LOADING_BACKEND_CALL, payload: true });
	try {
		const response = await axios.get(`${CORS_URL}/get?url=https://itunes.apple.com/lookup?id=${id}`);
		const data = JSON.parse(response.data.contents);
		const parsedData = data.results[0];
		const mergedPodcast = { ...parsedData, ...localPodcastInfo };
		saveDataByIdToLocalStorage(mergedPodcast, id);
		setPodcast(mergedPodcast);
	} catch (error) {
		console.log(error);
	} finally {
		dispatchIsLoading({ type: ACTIONS.SET_LOADING_BACKEND_CALL, payload: false });
	}
};

export { getPodcastById };
