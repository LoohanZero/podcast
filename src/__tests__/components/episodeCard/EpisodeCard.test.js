import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
	BrowserRouter,
	createMemoryRouter,
	RouterProvider
} from 'react-router-dom';

import EpisodeCard from '../../../components/episodeCard/EpisodeCard';

describe('Test EpisodeCard', () => {
    const id = '12312-231231'
    const index = 2
	const episode = {
		episodeGuid: '1231231',
        podcastId: '12312-223423', 
        index: '2', 
        trackName: 'Shamandalie', 
        trackTimeMillis: 156000, 
        releaseDate: '2005-05-02', 
        trackViewUrl: 'url'

	};

	it('should mount and show correct information', () => {
		render(<EpisodeCard
			index={index}
            key={episode.episodeGuid}
            id={episode.episodeGuid}
            podcastId={id}
            title={episode.trackName}
            duration={episode.trackTimeMillis}
            date={episode.releaseDate}
            link={episode.trackViewUrl}
		/>, { wrapper: BrowserRouter });

		expect(screen.getByRole('link')).toHaveTextContent(episode.trackName);
        expect(screen.getByRole('row')).toHaveTextContent(`${episode.trackName}2/5/20052:36`);
	});

	it('should redirect to correct url when "For the sake of revenge" link clicked', async () => {
		const router = createMemoryRouter([
			{
				path: '/podcast/:id',
				element: <EpisodeCard
                index={index}
                key={episode.episodeGuid}
                id={episode.episodeGuid}
                podcastId={id}
                title={episode.trackName}
                duration={episode.trackTimeMillis}
                date={episode.releaseDate}
                link={episode.trackViewUrl}
            />
			},
			{
				path: '/podcast/:id/episode/:episodeId',
				element: null
			}
		],
		{
			initialEntries: [ `/podcast/${id}` ],
			initialIndex: 0
		});

		render(<RouterProvider router={router} />);

		expect(router.state.location.pathname).toEqual(`/podcast/${id}`);

		fireEvent.click(screen.getByRole('link'));

		await waitFor(() => {
			expect(router.state.location.pathname).toEqual(`/podcast/${id}/episode/${episode.episodeGuid}`);
		});
	});
});