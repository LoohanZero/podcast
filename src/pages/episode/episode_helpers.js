const getEpisodeById = (episodes, episodeId) => {
	return episodes.filter(episode => episode.guid === episodeId)[0];
};

const getFormattedDescription = description => {
	return description?.trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '');
};

export { getEpisodeById, getFormattedDescription };
