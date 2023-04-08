const useLocalStorage = () => {
	const localStorage = window.localStorage;

	const checkTimeStorage = date => {
		if (new Date(date) <= new Date()) {
			localStorage.removeItem('data');
			return true;
		}
	};

	const getExpirationDate = () => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		return tomorrow.toString();
	};

	const getData = () => {
		const storedPodcasts = localStorage.getItem('data');
		const parsedPodcasts = JSON.parse(storedPodcasts);
		const expiredDate = checkTimeStorage(storedPodcasts?.expDate);

		return (storedPodcasts || !expiredDate) ? parsedPodcasts?.podcasts : { podcasts: null };
	};

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
