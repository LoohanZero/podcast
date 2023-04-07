/* eslint-disable no-console */
import axios from 'axios';

const SIZE_IMAGE = 170;

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

/**
* @param {Function} setPodcasts function that sets podcasts variable state
* @return {void}
*/
const getPodcastImage = images => {
	return images.filter(image => image.attributes.height === SIZE_IMAGE);
};

export { getPodcastImage, getPodcasts };
