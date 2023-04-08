/* eslint-disable no-console */
import axios from 'axios';

import { ACTIONS } from '../../app_helpers';
/**
* @param {Boolean} isLoading podcasts loading flag
* @param {Function} dispatchPodcastsState function that sets podcasts variable state
* @param {Function} savePodcastsToLocalStorage function that saves podcasts to local storage
* @returns {VoidFunction}
*/
const getPodcastById = async (id, podcast, setPodcast, dispatchIsLoading) => {
	dispatchIsLoading({ type: ACTIONS.SET_LOADING_BACKEND_CALL, payload: true });

	try {
		const response = await axios.get(`http://api.allorigins.win/get?url=https://itunes.apple.com/lookup?id=${id}`);
		const data = JSON.parse(response.data.contents);
		const parsedData = data.results[0];
		setPodcast(parsedData);
	} catch (error) {
		console.log(error);
	} finally {
		dispatchIsLoading({ type: ACTIONS.SET_LOADING_BACKEND_CALL, payload: false });
	}
};

export { getPodcastById };
