import { ACTIONS } from '../app_helpers';

const useLocalStorage = () => {
	const localStorage = window.localStorage;

	/**
	* Returns true if data is expired
	* @param {String} date podcasts loading flag
	* @returns {Boolean}
	*/
	const checkTimeStorage = date => {
		if (new Date(date) <= new Date()) {
			localStorage.removeItem('data');
			return true;
		}
		return false;
	};

	/**
	* Returns string with new expiration date
	* @returns {String}
	*/
	const getExpirationDate = () => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		return tomorrow.toString();
	};

	/**
	* Returns array of podcasts if there's any saved in the local storage, otherwise returns undefined
	* @param {Function} dispatchIsLoading Function to toggle loading
	* @param {String} name string with name to be saved locally
	* @returns {Array | undefined}
	*/
	const getData = (dispatchIsLoading, name) => {
		dispatchIsLoading({ type: ACTIONS.SET_LOADING_LOCAL_STORAGE, payload: true });
		const storedPodcasts = localStorage.getItem(name);
		const parsedPodcasts = JSON.parse(storedPodcasts);
		const expiredDate = checkTimeStorage(parsedPodcasts?.expDate);

		dispatchIsLoading({ type: ACTIONS.SET_LOADING_LOCAL_STORAGE, payload: false });
		return (storedPodcasts || !expiredDate) && parsedPodcasts?.podcasts;
	};

	/**
	* Returns array of podcasts if there's any saved in the local storage, otherwise returns undefined
	* @returns {Array | undefined}
	*/
	const getDataById = (id, name) => {
		const storedPodcasts = localStorage.getItem(name);
		const parsedPodcasts = JSON.parse(storedPodcasts);
		const podcast = parsedPodcasts.podcasts.filter(podcast => podcast.id.attributes['im:id'] === id);

		return storedPodcasts && podcast[0];
	};

	/**
	* Saves array of podcasts and expiration date in localstorage
	* @param {Array} podcasts array with podcasts objects
	* @param {String} name string with name to be saved locally
	* @returns {VoidFunction}
	*/
	const savePodcastsToLocalStorage = (podcasts, name) => {
		const podcastsInfo = {
			expDate: getExpirationDate(),
			podcasts
		};
		localStorage.setItem(name, JSON.stringify(podcastsInfo));
	};


	return {
		getData,
		getDataById,
		checkTimeStorage,
		savePodcastsToLocalStorage
	};
};

export default useLocalStorage;
