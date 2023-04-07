import './podcastCard.scss';

import React from 'react';

const PodcastCard = ({ id, title, image, author }) => {
	return (
		<article className="card-container" id={id}>
			<a className="card-details-container">
				<img className="card-image" src={image} />
				<h3 className="card-title">{title}</h3>
				<p className="card-author">Author: {author}</p>
			</a>
		</article>
	);
};

export default PodcastCard;
