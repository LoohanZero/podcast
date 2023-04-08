/* eslint-disable no-console */
import axios from 'axios';

/**
* @param {Boolean} isLoading podcasts loading flag
* @param {Function} dispatchPodcastsState function that sets podcasts variable state
* @param {Function} savePodcastsToLocalStorage function that saves podcasts to local storage
* @returns {VoidFunction}
*/
const getPodcastById = async (id, setPodcast, setIsLoading) => {
	setIsLoading(true);

	try {
		const response = await axios.get(`https://itunes.apple.com/lookup?id=${id}`);
		const data = response.data.results[0];
		console.log(data);
		setPodcast(data);
	} catch (error) {
		console.log(error);
	} finally {
		setIsLoading(false);
	}
};

export { getPodcastById };
