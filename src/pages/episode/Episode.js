/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import './episode.scss';

import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import useLocalStorage from '../../hooks/useLocalStorage';
import { getEpisodeById } from './episode_helpers';

const Episode = () => {
	const [ episode, setEpisode ] = useState(null);
	const { id: podcastId } = useOutletContext();
	const { episodeId } = useParams();
	const { getDataById } = useLocalStorage();

	useEffect(() => {
		if (podcastId) {
			const podcast = getDataById(podcastId);
			console.log(podcast);
			const currentEpisode = getEpisodeById(podcast.episodes, episodeId);
			!currentEpisode ? console.log('No episode found') : setEpisode(currentEpisode);
		}
	}, [ podcastId ]);

	return (
		<div className="episode-container">
			<h3 className="episode-title">{episode?.title}</h3>
			<p
				className="episode-description"
				dangerouslySetInnerHTML={{ __html: episode?.encoded }} ></p>

			<audio controls className="episode-audio">
				<source src={episode?.link} type="audio/ogg" />
				<source src={episode?.link} type="audio/mpeg" />
				<source src={episode?.link} type="audio/mp3" />
			Your browser does not support the audio element.
			</audio>
		</div>
	);
};

export default Episode;
