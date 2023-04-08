import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPodcastById } from './podcast_helpers';

const Podcast = ({ isLoading, setIsLoading }) => {
	const { id } = useParams();
	const [ podcast, setPodcast ] = useState(null);

	useEffect(() => {
		if (id) {
			getPodcastById(id, setPodcast, setIsLoading);
		}
	}, [ id ]);
	return (
		<div>
			<aside>

			</aside>
			<div>
				<h2></h2>
			</div>
		</div>
	);
};

export default Podcast;
