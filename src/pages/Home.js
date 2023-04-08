/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './home.scss';

import React, { useEffect, useReducer } from 'react';
import { PacmanLoader } from 'react-spinners';

import PodcastCard from '../components/PodcastCard/PodcastCard';
import useLocalStorage from '../hooks/useLocalStorage';
import { ACTIONS, filterPodcast, getPodcastImage, getPodcasts, initialState, podcastsReducer } from './home_helpers';

const Home = () => {
	const [ podcastsState, dispatchPodcastsState ] = useReducer(podcastsReducer, initialState);
	const { isLoading, podcasts, searchValue } = podcastsState;
	const { getData, checkTimeStorage, savePodcastsToLocalStorage } = useLocalStorage();

	useEffect(() => {
		const storedPodcasts = getData().podcasts;
		const noStoredPodcasts = !storedPodcasts?.data;
		const expiredDate = checkTimeStorage(storedPodcasts?.expDate);

		(noStoredPodcasts || expiredDate)
			? getPodcasts(isLoading, dispatchPodcastsState, savePodcastsToLocalStorage)
			: dispatchPodcastsState({ type: ACTIONS.SET_PODCASTS, payload: storedPodcasts.data });
	}, []);

	return (
		<div>
			<div className="home-search-container">
				<p className="home-search-amount">
					{podcasts?.filter(podcast => filterPodcast(podcast, searchValue)).length}
				</p>
				<input
					className="home-search-input"
					type="text"
					value={searchValue}
					placeholder="Filter podcasts..."
					onChange={event => dispatchPodcastsState({ type: ACTIONS.SET_SEARCH_VALUE, payload: event.target.value })}
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
				{isLoading && <PacmanLoader color="#2877bd" />}
			</div>

		</div>
	);
};

export default Home;
