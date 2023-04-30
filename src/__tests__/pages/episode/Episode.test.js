import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import * as rrd from 'react-router-dom';
import axios from 'axios';

import Episode from '../../../pages/episode/Episode';

jest.mock('react-router-dom');
jest.mock('axios');

describe('Test Episode', () => {
    const description = {description: 'This is a description'}
    const url = {episodeUrl: 'https//thisisaurl.com'}
    const episode = {
		episodeGuid: '1231231',
        podcastId: '12312-223423', 
        index: '2', 
        trackName: 'Shamandalie', 
        trackTimeMillis: 156000, 
        releaseDate: '2005-05-02', 
        trackViewUrl: 'url',
	};
    const podcast =  {
        id: {
        attributes: {
            'im:id': '12312312'
        }
    },
    'im:name': {
        label: 'For the sake of revenge'
    },
    'im:image':  'https://somelabel.com',
    'im:artist': {
        label: 'Sonata Arctica'
    }, 
    episodes: [ episode ]
}

    beforeEach(() => {
        rrd.useOutletContext.mockReturnValue({id: '12312312'});
        rrd.useParams.mockReturnValue({episodeId: episode.episodeGuid});
    })

	it('should mount and show correct information', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ podcasts: [podcast] }))
		render(<Episode />);

		expect(screen.getByRole('heading')).toHaveTextContent(episode.trackName);
        expect(screen.queryByText(description.description)).not.toBeInTheDocument();
        expect(screen.queryByText(url.episodeUrl)).not.toBeInTheDocument();
	});

	it('should show audio tag if url is included in episode object', () => {
        const audioEpisode = { ...episode, ...url }
        const audioPodcast = { ...podcast, episodes: [ audioEpisode ]}
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ podcasts: [audioPodcast] }))
		render(<Episode />);

		expect(screen.getByLabelText('audio')).toBeInTheDocument();
	});

    it('should not show audio tag if url is not included in episode object', () => {
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify({ podcasts: [podcast] }))
		render(<Episode />);

		expect(screen.queryByLabelText('audio')).not.toBeInTheDocument();
	});

});