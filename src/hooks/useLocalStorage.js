const useLocalStorage = () => {
	const localStorage = window.localStorage;

	const getData = () => {
		const storedPodcasts = localStorage.getItem('data');
		if (storedPodcasts) {
			return JSON.parse(storedPodcasts);
		} else {
			return {
				podcasts: {}
			};
		}
	};

	const getExpirationDate = () => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		return tomorrow.toString();
	};

	const savePodcastsToLocalStorage = (podcasts, data, page) => {
		let localPodcasts = getData();

		const podcastsInfo = {
			podcasts: {
				expDate: getExpirationDate(),
				nextPage: page,
				data: [ ...podcasts, ...data.results ]
			}
		};

		localPodcasts = {
			...localPodcasts,
			...podcastsInfo
		};

		localStorage.setItem('data', JSON.stringify(localPodcasts));
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
