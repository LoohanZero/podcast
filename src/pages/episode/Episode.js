/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import './episode.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Anchorme } from 'react-anchorme';
import { useOutletContext, useParams } from 'react-router-dom';

import useLocalStorage from '../../hooks/useLocalStorage';
import { getEpisodeById } from './episode_helpers';

const Episode = () => {
	const [ episode, setEpisode ] = useState(null);
	const audioRef = useRef(null);
	const { id: podcastId } = useOutletContext();
	const { episodeId } = useParams();
	const { getDataById } = useLocalStorage();

	useEffect(() => {
		if (podcastId) {
			const podcast = getDataById(podcastId);
			const currentEpisode = getEpisodeById(podcast.episodes, episodeId);
			!currentEpisode ? console.log('No episode found') : setEpisode(currentEpisode);
		}
	}, [ podcastId ]);

	return (
		<div className="episode-container">
			<h3 className="episode-title">{episode?.trackName}</h3>
			<p className="episode-description">
				<Anchorme
					target="_blank"
					rel="noreferrer noopener"
				>{episode?.description}</Anchorme>
			</p>

			{episode?.episodeUrl &&
			<audio controls className="episode-audio" ref={audioRef} aria-label='audio'>
				<source src={episode.episodeUrl} type="audio/ogg" />
				<source src={episode.episodeUrl} type="audio/mpeg" />
				<source src={episode.episodeUrl} type="audio/mp3" />
			Your browser does not support the audio element.
			</audio>}
		</div>
	);
};

export default Episode;
