import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { getPodcastByUrl } from './podcast_helpers';
const Podcast = () => {
	const { url, dispatchIsLoading } = useOutletContext();
	const [ podcast, setPodcast ] = useState(null);

	useEffect(() => {
		if (url) {
			getPodcastByUrl(url, setPodcast, dispatchIsLoading);
		}
	}, [ url ]);
	// const html = podcast && `<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="${podcast?.feedUrl}"></iframe>`;
	return (<div></div>);
};

export default Podcast;
