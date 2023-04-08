/* eslint-disable react-hooks/exhaustive-deps */
import './podcastLayout.scss';

import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Aside from '../../components/aside/Aside';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getPodcastById } from './podcastLayout_helpers';

const PodcastLayout = ({ isLoading, dispatchIsLoading }) => {
	const { id } = useParams();
	const [ podcast, setPodcast ] = useState(null);
	const [ localPodcast, setLocalPodcast ] = useState(null);
	const { getDataById } = useLocalStorage();

	useEffect(() => {
		if (id) {
			getPodcastById(id, podcast, setPodcast, dispatchIsLoading);
			const morePodcastInfo = getDataById(id);
			setLocalPodcast(morePodcastInfo);
		}
	}, [ id ]);

	return (
		<div className="podcast-layout">
			{!isLoading && podcast && <Aside
				author={podcast.artistName}
				image={podcast.artworkUrl600}
				name={podcast.collectionName}
				description={localPodcast.summary.label}
			/>}
			<Outlet context={{ url: podcast?.feedUrl, dispatchIsLoading }} />
		</div>
	);
};

export default PodcastLayout;
