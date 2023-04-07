/* eslint-disable no-console */
import axios from 'axios';

/**
* @param {Function} setPodcasts function that sets podcasts variable state
* @return {void}
*/
const getPodcasts = async setPodcasts => {
	try {
		const response = axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
		const data = response.data.feed.entry;
		setPodcasts(data);
	} catch (error) {
		console.log(error);
	}
};

export { getPodcasts };