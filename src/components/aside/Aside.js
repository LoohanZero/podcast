import './aside.scss';

import React from 'react';
import { Link } from 'react-router-dom';

const Aside = ({ id, image, author, name, description }) => {
	return (
		<aside className="aside-podcast-container">
			<Link to={`/podcast/${id}`}
				className="aside-podcast-image-container">
				<img className="aside-podcast-image" src={image} />
			</Link>
			<div className="aside-podcast-title-container">
				<h2 className="aside-podcast-title-name">
					<Link to={`/podcast/${id}`}>{name}</Link>
				</h2>
				<p className="aside-podcast-author"><span>by</span>
					<Link to={`/podcast/${id}`}>{author}</Link>
				</p>
			</div>
			<div className="aside-podcast-description-container">
				<p>Description:</p>
				<p>{description}</p>
			</div>
		</aside>
	);
};

export default Aside;
