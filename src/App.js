import './app.scss';

import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import Home from './pages/home/Home';
import Podcast from './pages/podcast/Podcast';
import PodcastLayout from './pages/poscastLayout/PodcastLayout';

function App () {
	const [ isLoading, setIsLoading ] = useState(false);

	return (
		<div className="app-container">
			<BrowserRouter>
				<header className="header-container">
					<Link to="/">
						<h1 className="app-title">Podcaster</h1>
					</Link>
					{isLoading && <ClipLoader color="#2877bd" size={25}/>}
				</header>
				<main>
					<Routes>
						<Route path="/" element={<Home isLoading={isLoading} setIsLoading={setIsLoading}/>} />
						<Route
							path="/podcast"
							element={<PodcastLayout isLoading={isLoading} setIsLoading={setIsLoading} />}
						>
							<Route path=":id" element={<Podcast />} />
							<Route path=":id/episode/:episodeId" element={<h2>Episode</h2>} />
						</Route>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
