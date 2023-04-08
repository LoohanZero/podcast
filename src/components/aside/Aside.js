import './aside.scss';

import React from 'react';

const Aside = ({ image, author, name, description }) => {
	return (
		<aside className="aside-podcast-container">
			<div className="aside-podcast-image-container">
				<img className="aside-podcast-image" src={image} />
			</div>
			<div className="aside-podcast-title-container">
				<h2 className="aside-podcast-title-name">{name}</h2>
				<p className="aside-podcast-author">by {author}</p>
			</div>
			<div className="aside-podcast-description-container">
				<p>Description:</p>
				<p>{description}</p>
			</div>
		</aside>
	);
};

export default Aside;
