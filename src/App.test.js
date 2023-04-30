import '@testing-library/jest-dom';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';

import App from './App';

jest.mock('axios');

describe('Test App', () => {
	const episode = {
		episodeGuid: '1231231',
		podcastId: '12312-223423',
		index: '2',
		trackName: 'Shamandalie',
		trackTimeMillis: 156000,
		releaseDate: '2005-05-02',
		trackViewUrl: 'url'
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
	const backendData = {
		data: {
			feed: {
				entry: data
			}
		}
	};

	it('should mount showing loader and then loader disappearing', async () => {
		axios.get.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(backendData))));
		render(<App />);

		expect(screen.getByText('Podcaster')).toBeInTheDocument();
		const loader = await screen.findByLabelText('loader');
		expect(loader).toBeInTheDocument();

		waitForElementToBeRemoved(loader);
	});
});
