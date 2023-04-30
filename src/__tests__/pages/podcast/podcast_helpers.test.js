import axios from 'axios';

import { getEpisodesByPodcastId } from '../../../pages/podcast/podcast_helpers';

jest.mock('axios');

describe('Test getEpisodesByPodcastId', () => {
	const episodes = {
		data: {
			results: [
				{ superfluosInfo: 'does not matter' },
				{ id: '123456' },
				{ id: '123123' },
				{ id: '34544' }
			]
		}
	};
	const id = '99999';
	const localPodcastInfo = { id: '23423423' };
	const dispatchIsLoading = jest.fn();
	const setEpisodeList = jest.fn();
	const saveDataByIdToLocalStorage = jest.fn();

	it('should call setEpisodeList, dispatchIsLoading and saveDataByIdToLocalStorage when correct arguments are passed and backend call response is 200', async () => {
		axios.get.mockResolvedValue(episodes);
		await getEpisodesByPodcastId(id, localPodcastInfo, setEpisodeList, dispatchIsLoading, saveDataByIdToLocalStorage);
		const newEpisodes = [ ...episodes.data.results ];

		expect(dispatchIsLoading).toBeCalledTimes(2);
		expect(setEpisodeList).toHaveBeenCalledWith(newEpisodes);
		expect(saveDataByIdToLocalStorage).toHaveBeenCalledWith({ ...localPodcastInfo, episodes: newEpisodes }, id);
	});

	it('should call dispatchIsLoading, and NOT call setEpisodeList and saveDataByIdToLocalStorage when correct arguments are passed and backend call response is rejected', async () => {
		axios.get.mockRejectedValue();
		await getEpisodesByPodcastId(id, localPodcastInfo, setEpisodeList, dispatchIsLoading, saveDataByIdToLocalStorage);

		expect(dispatchIsLoading).toBeCalledTimes(2);
		expect(setEpisodeList).not.toHaveBeenCalled();
		expect(saveDataByIdToLocalStorage).not.toHaveBeenCalled();
	});
});
