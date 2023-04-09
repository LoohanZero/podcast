import './episodeCard.scss';

import { Duration } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';

const EpisodeCard = ({ id, index, title, duration, date }) => {
	const formattedDate = new Date(date).toLocaleDateString();
	const millisDuration = duration * 1000;
	const formattedDuration = Duration.fromMillis(millisDuration).shiftTo('minutes', 'seconds').toObject();

	return (
		<tr id={id} className={`table-row ${index % 2 ? 'table-oddrow-background' : ''}`}>
			<td><Link className="episode-link">{title}</Link></td>
			<td>{formattedDate}</td>
			<td>{formattedDuration.minutes}:{formattedDuration.seconds}</td>
		</tr>

	);
};

export default EpisodeCard;
