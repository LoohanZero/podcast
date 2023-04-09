/* eslint-disable react-hooks/exhaustive-deps */
import './episode.scss';

import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import useLocalStorage from '../../hooks/useLocalStorage';
import { getEpisodeById, getFormattedDescription } from './episode_helpers';

const Episode = () => {
	const [ episode, setEpisode ] = useState(null);
	const { id: podcastId, isLoading, podcast, dispatchIsLoading } = useOutletContext();
	const { episodeId } = useParams();
	const { getDataById } = useLocalStorage();
	const formattedDescription = getFormattedDescription(episode?.description);
	useEffect(() => {
		if (podcastId) {
			const podcast = getDataById(podcastId);
			const currentEpisode = getEpisodeById(podcast.episodes, episodeId);
			setEpisode(currentEpisode);
		}
	}, [ podcastId ]);
	return (
		<div className="episode-container">
			<h3 className="episode-title">{episode?.title}</h3>
			<p
				className="episode-description"
				dangerouslySetInnerHTML={{ __html: formattedDescription }} ></p>

		</div>
	);
};

export default Episode;
