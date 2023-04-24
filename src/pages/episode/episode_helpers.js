/* eslint-disable no-useless-escape */
/**
* Returns Object of episode by episode Id
* @param {Object} episodes
* @param {String} episodeId
* @returns {Object}
*/
const getEpisodeById = (episodes, episodeId) => {
	return episodes.filter(episode => episode.episodeGuid === episodeId)[0];
};

export { getEpisodeById };
