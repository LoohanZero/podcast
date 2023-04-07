import React, { useEffect, useState } from 'react';

import PodcastCard from '../components/PodcastCard';
import { getPodcasts } from './home_helpers';

const Home = () => {
	const [ podcasts, setPodcasts ] = useState(null);

	useEffect(() => {
		getPodcasts(setPodcasts);
	}, []);
	return (
		<div>
			<h2 className="home-title">Podcaster</h2>
			{podcasts?.map(podcast => <PodcastCard key={podcast.id} />)}
		</div>
	);
};

export default Home;
