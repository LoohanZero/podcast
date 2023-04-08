import React from 'react';

const Aside = ({ image, author, name, description }) => {
	return (
		<aside>
			<img src={image} />
			<h2>{name}</h2>
			<p>by {author}</p>

			<p>Description:</p>
			<p>{description}</p>
		</aside>
	);
};

export default Aside;
