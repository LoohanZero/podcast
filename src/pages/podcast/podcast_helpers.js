/* eslint-disable no-console */
import axios from 'axios';
import XMLParser from 'react-xml-parser';

import { ACTIONS } from '../../app_helpers';

const formatDataToObject = (episodeList, episode) => {
	const formattedEpisode = episode.reduce((accum, value) => ({ ...accum, [value.name]: value.value }), {});
	return [ ...episodeList, formattedEpisode ];
};

/**
* @param {String} url url to get the info from
* @param {Function} setEpisodeList function that sets episodes variable state
* @param {Function} dispatchIsLoading sets is Loading to false/true
* @returns {VoidFunction}
*/
const getPodcastByUrl = async (url, setEpisodeList, dispatchIsLoading, savePodcastsToLocalStorage) => {
	dispatchIsLoading({ type: ACTIONS.SET_LOADING_PARSER, payload: true });
	try {
		const response = await axios.get(`https://api.allorigins.win/raw?url=${url}`, { 'Content-Type': 'application/xml; charset=utf-8' });
		const parsedData = new XMLParser().parseFromString(response.data);
		const data = parsedData.children[0].children;
		const episodeList = data.filter(podcast => podcast.name === 'item').map(episode => episode.children).reduce(formatDataToObject, []);
		setEpisodeList(episodeList);
		savePodcastsToLocalStorage(episodeList, 'episodes');
	} catch (error) {
		console.log(error);
	} finally {
		dispatchIsLoading({ type: ACTIONS.SET_LOADING_PARSER, payload: false });
	}
};

export { getPodcastByUrl };
