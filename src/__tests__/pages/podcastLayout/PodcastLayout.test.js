import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PodcastLayout from '../../../pages/podcastLayout/PodcastLayout';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({ id: '12312312' }),
	useOutletContext: () => ({ id: '12312312', isLoading: false, dispatchIsLoading: jest.fn() })
}));
jest.mock('axios');

describe('Test PodcastLayout', () => {
	const episode = {
		episodeGuid: '1231231',
		podcastId: '12312-223423',
		index: '2',
		trackName: 'Shamandalie',
		trackTimeMillis: 156000,
		releaseDate: '2005-05-02',
		trackViewUrl: 'url'
	};
	const localPodcast = {
		id: {
			attributes: {
				'im:id': '12312312'
			}
		},
		collectionName: 'For the sake of revenge'
	};
	const podcast = {
		artistName: 'Sonata Arctica',
		artworkUrl600: 'https://i.pinimg.com/originals/59/37/18/593718a7d849a48fa0b7254c9124589b.jpg',
		collectionName: 'For the sake of revenge',
		summary: {
			label: 'For the Sake of Revenge is a live album and DVD recorded by the Finnish power metal band Sonata Arctica. It was recorded at Shibuya AX, Tokyo, Japan on 5 February 2005. Along with the CD there is a DVD in stereo and Surround 5.1 sound, which also includes Finnish commentary track by the band, Misplaced Cameras On Tour, a biography, discography and some photos.'
		},
		episodes: [ episode ]
	};
	const data = { results: [ podcast ] };
	const backendData = { data: { contents: JSON.stringify(data) } };

	it('should mount', async () => {
		axios.get.mockResolvedValue(backendData);
		jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ podcasts: [ localPodcast ] }));

		render(<PodcastLayout isLoading={false} dispatchIsLoading={jest.fn()}/>, { wrapper: BrowserRouter });

		expect(await screen.findByRole('heading')).toHaveTextContent(podcast.collectionName);
		expect(await screen.findByText(podcast.summary.label)).toBeInTheDocument();
	});
	it('should not show anything if no podcasts are found', async () => {
		jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ podcasts: [ ] }));
		axios.get.mockRejectedValue();

		render(<PodcastLayout isLoading={false} dispatchIsLoading={jest.fn()}/>, { wrapper: BrowserRouter });

		expect(await screen.queryByRole('heading')).not.toBeInTheDocument();
		expect(await screen.queryByText(podcast.summary.label)).not.toBeInTheDocument();
	});
});
