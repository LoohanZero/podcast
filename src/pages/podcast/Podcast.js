/* eslint-disable react-hooks/exhaustive-deps */
import './podcast.scss';

import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import EpisodeCard from '../../components/episodeCard/EpisodeCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getEpisodesByPodcastId } from './podcast_helpers';

const Podcast = () => {
	const { id, isLoading, dispatchIsLoading } = useOutletContext();
	const [ episodeList, setEpisodeList ] = useState(null);
	const { getDataById, saveDataByIdToLocalStorage } = useLocalStorage();

	useEffect(() => {
		const localPodcast = getDataById(id);

		if (!localPodcast?.episodes) {
			getEpisodesByPodcastId(id, localPodcast, setEpisodeList, dispatchIsLoading, saveDataByIdToLocalStorage);
		} else {
			setEpisodeList(localPodcast.episodes);
		}
	}, [ id ]);
	return (
		<div className="podcast-episodes-container">
			{!isLoading && episodeList && (
				<>
					<h3 className="podcast-episodes-amount">
						Episodes: {episodeList.length}
					</h3>
					{episodeList.length > 0 &&
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
									key={episode.trackId}
									id={episode.trackId}
									podcastId={id}
									title={episode.trackName}
									duration={episode.trackTimeMillis}
									date={episode.releaseDate}
									link={episode.trackViewUrl}
								/>))}
						</tbody>
					</table>}
				</>)}
		</div>);
};

export default Podcast;
