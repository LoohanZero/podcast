/* eslint-disable no-console */
import axios from 'axios';

import { ACTIONS } from '../../app_helpers';

const formatDataToObject = (episodeList, episode) => {
	const episodeArray = [ ...episode ];
	const objectEpisode = episodeArray.reduce((accum, value) => ({ ...accum, [value.localName]: value.innerHTML }));
	return [ ...episodeList, objectEpisode ];
};

/**
* @param {String} url url to get the info from
* @param {Function} setEpisodeList function that sets episodes variable state
* @param {Function} dispatchIsLoading sets is Loading to false/true
* @returns {VoidFunction}
*/
const getPodcastByUrl = async (url, localPodcastInfo, setEpisodeList, dispatchIsLoading, saveDataByIdToLocalStorage) => {
	dispatchIsLoading({ type: ACTIONS.SET_LOADING_PARSER, payload: true });
	try {
		const response = await axios.get(`https://api.allorigins.win/raw?url=${url}`, { 'Content-Type': 'application/xml; charset=utf-8' });
		const parser = new DOMParser();
		const xml = parser.parseFromString(response.data, 'text/xml');
		const dataHttp = xml.getElementsByTagName('item');
		const arrayData = [ ...dataHttp ];
		const formattedEpisodeList = arrayData.map(item => item.children).reduce(formatDataToObject, []);
		const mergedPodcast = { ...localPodcastInfo, episodes: formattedEpisodeList };
		setEpisodeList(formattedEpisodeList);
		saveDataByIdToLocalStorage(mergedPodcast);
	} catch (error) {
		console.log(error);
	} finally {
		dispatchIsLoading({ type: ACTIONS.SET_LOADING_PARSER, payload: false });
	}
};

export { getPodcastByUrl };
