import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import * as rrd from 'react-router-dom';

import Podcast from '../../../pages/podcast/Podcast';

jest.mock('react-router-dom');

describe('Test Podcast', () => {
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
		id: {
			attributes: {
				'im:id': '12312312'
			}
		},
		'im:name': {
			label: 'For the sake of revenge'
		},
		'im:image': [ {
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
		} ],
		'im:artist': {
			label: 'Sonata Arctica'
		},
		episodes: [ episode ]
	};

	beforeEach(() => {
		rrd.useOutletContext.mockReturnValue({ id: '12312312', isLoading: false, dispatchIsLoading: jest.fn() });
		rrd.useParams.mockReturnValue({ episodeId: episode.episodeGuid });
	});

	it('should mount and show a two rows of information', () => {
		jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ podcasts: [ podcast ] }));
		render(<Podcast />);

		expect(screen.getByRole('heading')).toHaveTextContent(`Episodes: ${podcast.episodes.length}`);
		expect(screen.getAllByRole('row').length).toEqual(2);
	});

	it('should not show any information except 0 episodes if podcast has no episodes', () => {
		jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ podcasts: [ { ...podcast, episodes: [] } ] }));
		render(<Podcast />);

		expect(screen.getByRole('heading')).toHaveTextContent('Episodes: 0');
		expect(screen.queryByRole('row')).not.toBeInTheDocument();
	});
});
