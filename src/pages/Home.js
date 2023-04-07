/* eslint-disable react-hooks/exhaustive-deps */
import './home.scss';

import React, { useEffect, useState } from 'react';

import PodcastCard from '../components/PodcastCard';
import useLocalStorage from '../hooks/useLocalStorage';
import { getPodcastImage, getPodcasts } from './home_helpers';

const Home = () => {
	const [ podcasts, setPodcasts ] = useState(null);
	const { getData, checkTimeStorage } = useLocalStorage();

	useEffect(() => {
		const storedPodcasts = getData().podcasts;
		const noStoredPodcasts = !storedPodcasts?.data;
		const expiredDate = checkTimeStorage(storedPodcasts?.expDate);

		(noStoredPodcasts || expiredDate) ? getPodcasts(setPodcasts) : setPodcasts(storedPodcasts.data);
	}, []);

	return (
		<div>
			<h2 className="home-title">Podcaster</h2>
			{podcasts?.map(podcast => (
				<PodcastCard
					key={podcast.id.attributes['im:id']}
					id={podcast.id.attributes['im:id']}
					title={podcast['im:name'].label}
					image={getPodcastImage(podcast['im:image'])}
					author={podcast['im:artist'].label}
				/>
			))}
		</div>
	);
};

export default Home;
