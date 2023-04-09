/* eslint-disable react-hooks/exhaustive-deps */
import './podcast.scss';

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
		<div className="podcast-episodes-container">
			{episodeList && (
				<>
					<h3 className="podcast-episodes-amount">
						Episodes: {episodeList.length}
					</h3>
					<table className="podcast-episodes-table">
						<thead className="podcast-episodes-head">
							<tr>
								<th>Title</th>
								<th>Date</th>
								<th>Duration</th>
							</tr>
						</thead>
						<tbody>
							{episodeList.map((episode, index) => (
								<EpisodeCard
									index={index}
									key={episode.guid}
									id={episode.guid}
									title={episode.title}
									duration={episode['itunes:duration']}
									date={episode.pubDate}
								/>))}
						</tbody>
					</table>
				</>)}
		</div>);
};

export default Podcast;
