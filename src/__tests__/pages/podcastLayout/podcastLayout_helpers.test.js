import axios from 'axios';

import { getPodcastById } from '../../../pages/podcastLayout/podcastLayout_helpers';

jest.mock('axios');

describe('Test getPodcastById', () => {
	const data = { results: [ { podcastId: '23423423', info: 'someMoreInfo' } ] };
	const episodes = { data: { contents: JSON.stringify(data) } };
	const id = '99999';
	const localPodcastInfo = { id: '23423423', localInfo: 'invent' };
	const dispatchIsLoading = jest.fn();
	const setPodcast = jest.fn();
	const saveDataByIdToLocalStorage = jest.fn();

	it('should call setPodcast, dispatchIsLoading and saveDataByIdToLocalStorage when correct arguments are passed and backend call response is 200', async () => {
		axios.get.mockResolvedValue(episodes);
		await getPodcastById(id, localPodcastInfo, setPodcast, dispatchIsLoading, saveDataByIdToLocalStorage);
		const mergedPodcasts = { ...data.results[0], ...localPodcastInfo };

		expect(dispatchIsLoading).toBeCalledTimes(2);
		expect(setPodcast).toHaveBeenCalledWith(mergedPodcasts);
		expect(saveDataByIdToLocalStorage).toHaveBeenCalledWith(mergedPodcasts, id);
	});

	it('should call dispatchIsLoading, and NOT call setPodcast and saveDataByIdToLocalStorage when correct arguments are passed and backend call response is rejected', async () => {
		axios.get.mockRejectedValue();
		await getPodcastById(id, localPodcastInfo, setPodcast, dispatchIsLoading, saveDataByIdToLocalStorage);

		expect(dispatchIsLoading).toBeCalledTimes(2);
		expect(setPodcast).not.toHaveBeenCalled();
		expect(saveDataByIdToLocalStorage).not.toHaveBeenCalled();
	});
});
