import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
	BrowserRouter,
	createMemoryRouter,
	RouterProvider
} from 'react-router-dom';

import Aside from '../../../components/aside/Aside';

describe('Test Aside', () => {
	const podcast = {
		artistName: 'Sonata Arctica',
		id: '1231231',
		image: 'https://i.pinimg.com/originals/59/37/18/593718a7d849a48fa0b7254c9124589b.jpg',
		collectionName: 'For the sake of revenge',
		summary: {
			label: 'For the Sake of Revenge is a live album and DVD recorded by the Finnish power metal band Sonata Arctica. It was recorded at Shibuya AX, Tokyo, Japan on 5 February 2005. Along with the CD there is a DVD in stereo and Surround 5.1 sound, which also includes Finnish commentary track by the band, Misplaced Cameras On Tour, a biography, discography and some photos.'
		}

	};

	it('should mount and show correct information', () => {
		render(<Aside
			author={podcast.artistName}
			id={podcast.id}
			image={podcast.artworkUrl600}
			name={podcast.collectionName}
			description={podcast.summary?.label}
		/>, { wrapper: BrowserRouter });

		expect(screen.getByRole('heading')).toHaveTextContent(podcast.collectionName);
		expect(screen.getByText(podcast.summary.label)).toBeInTheDocument();
	});

	it('should redirect to correct url when "For the sake of revenge" link clicked', async () => {
		const router = createMemoryRouter([
			{
				path: '/podcast',
				element: <Aside
					author={podcast.artistName}
					id={podcast.id}
					image={podcast.artworkUrl600}
					name={podcast.collectionName}
					description={podcast.summary?.label}/>
			},
			{
				path: '/podcast/:id',
				element: null
			}
		],
		{
			initialEntries: [ '/podcast' ],
			initialIndex: 0
		});

		render(<RouterProvider router={router} />);

		expect(router.state.location.pathname).toEqual('/podcast');

		fireEvent.click(screen.getByText(podcast.collectionName));

		await waitFor(() => {
			expect(router.state.location.pathname).toEqual(`/podcast/${podcast.id}`);
		});
	});

	it('should redirect to correct url when image link clicked', async () => {
		const router = createMemoryRouter([
			{
				path: '/podcast',
				element: <Aside
					author={podcast.artistName}
					id={podcast.id}
					image={podcast.artworkUrl600}
					name={podcast.collectionName}
					description={podcast.summary?.label}/>
			},
			{
				path: '/podcast/:id',
				element: null
			}
		],
		{
			initialEntries: [ '/podcast' ],
			initialIndex: 0
		});

		render(<RouterProvider router={router} />);

		expect(router.state.location.pathname).toEqual('/podcast');

		fireEvent.click(screen.getByRole('img'));

		await waitFor(() => {
			expect(router.state.location.pathname).toEqual(`/podcast/${podcast.id}`);
		});
	});
});
