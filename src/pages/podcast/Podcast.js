import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import EpisodeCard from '../../components/episodeCard/EpisodeCard';
import { getPodcastByUrl } from './podcast_helpers';

const Podcast = () => {
	const { url, dispatchIsLoading } = useOutletContext();
	const [ episodeList, setEpisodeList ] = useState(null);

	useEffect(() => {
		if (url) {
			getPodcastByUrl(url, setEpisodeList, dispatchIsLoading);
		}
	}, [ url ]);

	return (
		<div>
			{episodeList && (
				<>
					<h3>
						Episodes: {episodeList.length}
					</h3>
					<div>
						{episodeList.map(episode => <EpisodeCard />)}
					</div>
				</>)}
		</div>);
};

export default Podcast;
