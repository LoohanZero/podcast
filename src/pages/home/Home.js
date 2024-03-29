/* eslint-disable react-hooks/exhaustive-deps */
import './home.scss';

import React, { useEffect, useState } from 'react';

import PodcastCard from '../../components/podcastCard/PodcastCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import { filterPodcast, getPodcastImage, getPodcasts } from './home_helpers';

const Home = ({ isLoading, dispatchIsLoading }) => {
	const [ podcasts, setPodcasts ] = useState(null);
	const [ searchValue, setSearchValue ] = useState('');
	const { getData, savePodcastsToLocalStorage } = useLocalStorage();

	useEffect(() => {
		const storedPodcasts = getData(dispatchIsLoading);

		if (storedPodcasts) {
			setPodcasts(storedPodcasts);
		} else {
			getPodcasts(dispatchIsLoading, setPodcasts, savePodcastsToLocalStorage);
		}
	}, []);

	return (
		<div>
			<div className="home-search-container">
				<p className="home-search-amount">
					{podcasts?.filter(podcast => filterPodcast(podcast, searchValue)).length || 0}
				</p>
				<input
					className="home-search-input"
					aria-label='home-search-field'
					type="text"
					value={searchValue}
					placeholder="Filter podcasts..."
					onChange={event => setSearchValue(event.target.value)}
				/>
			</div>
			<div className="home-podcasts-container">
				{!isLoading && podcasts?.filter(podcast => filterPodcast(podcast, searchValue)).map(podcast => (
					<PodcastCard
						key={podcast.id.attributes['im:id']}
						id={podcast.id.attributes['im:id']}
						title={podcast['im:name'].label}
						image={getPodcastImage(podcast['im:image'])}
						author={podcast['im:artist'].label}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
