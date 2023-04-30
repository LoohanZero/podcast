import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../../pages/home/Home';

jest.mock('axios');

describe('Test Home', () => {
	const dispatchIsLoading = jest.fn();
	const podcasts = [
		{
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
			}
		},
		{
			id: {
				attributes: {
					'im:id': '453453'
				}
			},
			'im:name': {
				label: 'The Silent Force'
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
				label: 'Within Temptation'
			}
		} ];
	const data = {
		data: {
			feed: {
				entry: podcasts
			}
		}
	};

	it('should mount and show two podcasts', async () => {
		axios.get.mockResolvedValue(data);
		render(<Home isLoading={false} dispatchIsLoading={dispatchIsLoading} />, { wrapper: BrowserRouter });

		await waitFor(() => {
			expect(screen.queryByText('2')).toBeInTheDocument();
			expect(screen.queryAllByRole('link').length).toBe(podcasts.length);
		});
	});

	it('should show one podcast when "sonata" is searched', async () => {
		axios.get.mockResolvedValue(data);
		render(<Home isLoading={false} dispatchIsLoading={dispatchIsLoading} />, { wrapper: BrowserRouter });
		const text = 'sonata';

		await waitFor(() => {
			const input = screen.getByLabelText('home-search-field');

			fireEvent.change(input, { target: { value: text } });
			expect(input.value).toBe(text);
			expect(screen.queryAllByRole('link').length).toBe(1);
			expect(screen.queryByText(text, { exact: false })).toBeInTheDocument();
			expect(screen.queryByText('Temptation', { exact: false })).not.toBeInTheDocument();
			expect(screen.queryByText('1')).toBeInTheDocument();
		});
	});

	it('should show one podcast when "temptation" is searched', async () => {
		axios.get.mockResolvedValue(data);
		render(<Home isLoading={false} dispatchIsLoading={dispatchIsLoading} />, { wrapper: BrowserRouter });
		const text = 'temptation';
		await waitFor(() => {
			const input = screen.getByLabelText('home-search-field');

			fireEvent.change(input, { target: { value: text } });
			expect(input.value).toBe(text);
			expect(screen.queryAllByRole('link').length).toBe(1);
			expect(screen.queryByText(text, { exact: false })).toBeInTheDocument();
			expect(screen.queryByText('Sonata', { exact: false })).not.toBeInTheDocument();
			expect(screen.queryByText('1')).toBeInTheDocument();
		});
	});

	it('should show no podcast when "epica" is searched', async () => {
		axios.get.mockResolvedValue(data);
		render(<Home isLoading={false} dispatchIsLoading={dispatchIsLoading} />, { wrapper: BrowserRouter });
		const text = 'epica';
		await waitFor(() => {
			const input = screen.getByLabelText('home-search-field');

			fireEvent.change(input, { target: { value: text } });
			expect(input.value).toBe(text);
			expect(screen.queryAllByRole('link').length).toBe(0);
			expect(screen.queryByText('Temptation', { exact: false })).not.toBeInTheDocument();
			expect(screen.queryByText('Sonata', { exact: false })).not.toBeInTheDocument();
			expect(screen.queryByText('0')).toBeInTheDocument();
		});
	});
});
