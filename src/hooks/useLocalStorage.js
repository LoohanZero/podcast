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
	* @returns {Array | undefined}
	*/
	const getData = setIsLoading => {
		setIsLoading(true);
		const storedPodcasts = localStorage.getItem('data');
		const parsedPodcasts = JSON.parse(storedPodcasts);
		const expiredDate = checkTimeStorage(parsedPodcasts?.expDate);

		return (storedPodcasts || !expiredDate) && parsedPodcasts?.podcasts;
	};

	/**
	* Saves array of podcasts and expiration date in localstorage
	* @param {Array} podcasts array with podcasts objects
	* @returns {VoidFunction}
	*/
	const savePodcastsToLocalStorage = podcasts => {
		const podcastsInfo = {
			expDate: getExpirationDate(),
			podcasts
		};
		localStorage.setItem('data', JSON.stringify(podcastsInfo));
	};

	return {
		getData,
		checkTimeStorage,
		savePodcastsToLocalStorage
	};
};

export default useLocalStorage;
