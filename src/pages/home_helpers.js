/* eslint-disable no-console */
import axios from 'axios';

const SIZE_IMAGE = 170;

/**
* @param {Function} setPodcasts function that sets podcasts variable state
* @return {void}
*/
const getPodcasts = async (setPodcasts, savePodcastsToLocalStorage) => {
	try {
		const response = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
		const data = response.data.feed.entry;
		setPodcasts(data);
		savePodcastsToLocalStorage(data);
	} catch (error) {
		console.log(error);
	}
};

/**
* Returns string with image url
* @param {Array} images array with images
* @return {String}
*/
const getPodcastImage = images => {
	const imageObject = images.filter(image => Number(image.attributes.height) === SIZE_IMAGE)[0];
	return imageObject.label;
};

export { getPodcastImage, getPodcasts };
