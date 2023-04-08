import './podcastCard.scss';

import React from 'react';

const PodcastCard = ({ id, title, image, author }) => {
	return (
		<article className="card-container" id={id}>
			<div className="card-details-container">
				<img className="card-image" src={image} />
				<h3 className="card-title">{title}</h3>
				<p className="card-author">Author: {author}</p>
			</div>
		</article>
	);
};

export default PodcastCard;
