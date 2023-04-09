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
	const getData = () => {
		const storedPodcasts = localStorage.getItem('data');
		const parsedPodcasts = JSON.parse(storedPodcasts);
		const expiredDate = checkTimeStorage(parsedPodcasts?.expDate);

		return (storedPodcasts || !expiredDate) && parsedPodcasts?.podcasts;
	};

	/**
	* Returns array of podcasts if there's any saved in the local storage, otherwise returns undefined
	* @returns {Array | undefined}
	*/
	const getDataById = id => {
		const storedPodcasts = localStorage.getItem('data');
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
	const savePodcastsToLocalStorage = podcasts => {
		const podcastsInfo = {
			expDate: getExpirationDate(),
			podcasts
		};
		localStorage.setItem('data', JSON.stringify(podcastsInfo));
	};

	/**
	* Saves array of podcasts and expiration date in localstorage
	* @param {Array} podcasts array with podcasts objects
	* @param {String} name string with name to be saved locally
	* @returns {VoidFunction}
	*/
	const saveDataByIdToLocalStorage = (mergedPodcasts, id) => {
		const podcastList = getData();
		const index = podcastList.findIndex(podcast => podcast.id.attributes['im:id'] === id);
		podcastList.splice(index, 1, mergedPodcasts);

		localStorage.setItem('data', JSON.stringify({
			expDate: getExpirationDate(),
			podcasts: podcastList
		}));
	};

	return {
		getData,
		getDataById,
		checkTimeStorage,
		savePodcastsToLocalStorage,
		saveDataByIdToLocalStorage
	};
};

export default useLocalStorage;
