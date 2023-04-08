/* eslint-disable no-console */
import axios from 'axios';
import XMLParser from 'react-xml-parser';

import { ACTIONS } from '../../app_helpers';

/**
* @param {String} url url to get the info from
* @param {Function} setPodcast function that sets podcasts variable state
* @param {Function} dispatchIsLoading sets is Loading to false/true
* @returns {VoidFunction}
*/
const getPodcastByUrl = async (url, setPodcast, dispatchIsLoading) => {
	dispatchIsLoading({ type: ACTIONS.SET_LOADING_BACKEND_CALL, payload: true });
	try {
		const response = await axios.get(`https://api.allorigins.win/raw?url=${url}`, { 'Content-Type': 'application/xml; charset=utf-8' });
		const parsedData = new XMLParser().parseFromString(response.data);
		const data = parsedData.children[0].children;
		console.log(parsedData.children[0].children);
		setPodcast(data);
	} catch (error) {
		console.log(error);
	} finally {
		dispatchIsLoading({ type: ACTIONS.SET_LOADING_BACKEND_CALL, payload: true });
	}
};

export { getPodcastByUrl };
