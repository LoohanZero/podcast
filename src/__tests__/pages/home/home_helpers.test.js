import axios from 'axios';

import { filterPodcast, getPodcastImage, getPodcasts } from '../../../pages/home/home_helpers';

jest.mock('axios');

describe('Test getPodcasts', () => {
	const dispatchIsLoading = jest.fn();
	const setPodcasts = jest.fn();
	const savePodcastsToLocalStorage = jest.fn();
	const podcasts = {
		data: {
			feed: {
				entry: [ { id: '123456' }, { id: '123123' }, { id: '34544' } ]
			}
		}
	};

	it('should call dispatchIsLoading, setPodcasts and savePodcastsToLocalStorage when correct arguments are passed and backend call response is 200', async () => {
		axios.get.mockResolvedValue(podcasts);
		await getPodcasts(dispatchIsLoading, setPodcasts, savePodcastsToLocalStorage);

		expect(dispatchIsLoading).toBeCalledTimes(2);
		expect(setPodcasts).toHaveBeenCalledWith(podcasts.data.feed.entry);
		expect(savePodcastsToLocalStorage).toHaveBeenCalledWith(podcasts.data.feed.entry);
	});

	it('should NOT call dispatchIsLoading, setPodcasts and savePodcastsToLocalStorage when correct arguments are passed and backend call response is rejected', async () => {
		axios.get.mockRejectedValue();
		await getPodcasts(dispatchIsLoading, setPodcasts, savePodcastsToLocalStorage);

		expect(dispatchIsLoading).toBeCalledTimes(2);
		expect(setPodcasts).not.toHaveBeenCalled();
		expect(savePodcastsToLocalStorage).not.toHaveBeenCalled();
	});
});

describe('Test getPodcastImage', () => {
	const images = [ {
		label: 'https://somelabel.com',
		attributes: {
			height: '170'
		}
	}, {
		label: 'https://someotherlabel.com',
		attributes: {
			height: '70'
		}
	}, {
		label: 'https://someotherotherlabel.com',
		attributes: {
			height: '300'
		}
	} ];

	const images2 = [ {
		label: 'https://someotherlabel.com',
		attributes: {
			height: '70'
		}
	}, {
		label: 'https://someotherotherlabel.com',
		attributes: {
			height: '300'
		}
	} ];

	it('should return image string label when correct argument is passed', () => {
		const expectedImageLabel = getPodcastImage(images);

		expect(expectedImageLabel).toEqual(images[0].label);
	});

	it('should return default image url when array passed doesnt include size', () => {
		const expectedImageLabel = getPodcastImage(images2);

		expect(expectedImageLabel).toEqual('R.jpg');
	});

	it('should throw error when no array is passed', () => {
		expect(() => getPodcastImage()).toThrowError();
	});
});

describe('Test filterPodcast', () => {
	const podcast = {
		'im:name': {
			label: 'For the sake of revenge'
		},
		'im:artist': {
			label: 'Sonata Arctica'
		}
	};
	it('should return true if podcast name or artist includes searched word', () => {
		const expectedResult = filterPodcast(podcast, 'sonata');
		const expectedResult2 = filterPodcast(podcast, 'revenge');

		expect(expectedResult).toBe(true);
		expect(expectedResult2).toBe(true);
	});

	it('should return false if podcast name or artist includes searched word', () => {
		const expectedResult = filterPodcast(podcast, 'swift');
		const expectedResult2 = filterPodcast(podcast, 'trouble');

		expect(expectedResult).toBe(false);
		expect(expectedResult2).toBe(false);
	});

	it('should return false if no searched word is passed', () => {
		const expectedResult = filterPodcast(podcast, null);

		expect(expectedResult).toBe(false);
	});

	it('should throw error if no podcast is passed or no argument is passed', () => {
		expect(() => filterPodcast(null, 'sonata')).toThrowError();
		expect(() => filterPodcast()).toThrowError();
	});
});
