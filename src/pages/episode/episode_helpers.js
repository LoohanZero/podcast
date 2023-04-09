const getEpisodeById = (episodes, episodeId) => {
	return episodes.filter(episode => episode.guid === episodeId)[0];
};

export { getEpisodeById };
