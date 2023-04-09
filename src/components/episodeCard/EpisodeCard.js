import './episodeCard.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { getFormattedDuration } from './episodeCard_helpers';

const EpisodeCard = ({ id, podcastId, index, title, duration, date }) => {
	const formattedDate = new Date(date).toLocaleDateString();
	const formattedDuration = getFormattedDuration(duration);
	return (
		<tr id={id} className={`table-row ${index % 2 ? 'table-oddrow-background' : ''}`}>
			<td><Link to={`/podcast/${podcastId}/episode/${id}`} className="episode-link">{title}</Link></td>
			<td>{formattedDate}</td>
			<td>{formattedDuration || 0}</td>
		</tr>

	);
};

export default EpisodeCard;
