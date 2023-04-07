const useLocalStorage = () => {
	const localStorage = window.localStorage;

	const getData = () => {
		const storedPodcasts = localStorage.getItem('data');
		return storedPodcasts ? JSON.parse(storedPodcasts) : { podcasts: {} };
	};

	const getExpirationDate = () => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		return tomorrow.toString();
	};

	const savePodcastsToLocalStorage = podcasts => {
		const podcastsInfo = {
			podcasts: {
				expDate: getExpirationDate(),
				data: podcasts
			}
		};

		localStorage.setItem('data', JSON.stringify(podcastsInfo));
	};

	const checkTimeStorage = date => {
		if (new Date(date) <= new Date()) {
			localStorage.removeItem('data');
			return true;
		}
	};

	return {
		getData,
		checkTimeStorage,
		savePodcastsToLocalStorage
	};
};

export default useLocalStorage;
