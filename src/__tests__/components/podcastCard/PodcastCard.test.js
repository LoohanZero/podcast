import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
	BrowserRouter,
	createMemoryRouter,
	RouterProvider
} from 'react-router-dom';

import PodcastCard from '../../../components/podcastCard/PodcastCard';

describe('Test PodcastCard', () => {
	const podcast = {
		id: {
            attributes: {
                'im:id': '1231231231'
            }
        },
        'im:name': {
            label: 'For the sake of revenge'
        },
        'im:image':  'https://somelabel.com',
        'im:artist': {
            label: 'Sonata Arctica'
        }
	};

	it('should mount and show correct information', () => {
		render(<PodcastCard
            key={podcast.id.attributes['im:id']}
            id={podcast.id.attributes['im:id']}
            title={podcast['im:name'].label}
            image={podcast['im:image']}
            author={podcast['im:artist'].label}
        />, { wrapper: BrowserRouter });

		expect(screen.getByRole('link')).toHaveTextContent(`${podcast['im:name'].label}Author: ${podcast['im:artist'].label}`);
        expect(screen.getByRole('heading')).toHaveTextContent(podcast['im:name'].label);
	});

	it('should redirect to correct url when "For the sake of revenge" link clicked', async () => {
		const router = createMemoryRouter([
			{
				path: '/',
				element: <PodcastCard
                key={podcast.id.attributes['im:id']}
                id={podcast.id.attributes['im:id']}
                title={podcast['im:name'].label}
                image={podcast['im:image']}
                author={podcast['im:artist'].label}
            />
			},
			{
				path: '/podcast/:id',
				element: null
			}
		],
		{
			initialEntries: [ '/' ],
			initialIndex: 0
		});

		render(<RouterProvider router={router} />);

		expect(router.state.location.pathname).toEqual('/');

		fireEvent.click(screen.getByRole('link'));

		await waitFor(() => {
			expect(router.state.location.pathname).toEqual(`/podcast/${podcast.id.attributes['im:id']}`);
		});
	});
});