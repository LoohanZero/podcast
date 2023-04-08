import './loader.scss';

import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div className='loader-container'>
			<PacmanLoader color="#2877bd" />
		</div>
	);
};

export default Loader;
