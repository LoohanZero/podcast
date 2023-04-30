import './app.scss';

import { useReducer } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { initialState, loadingReducer } from './app_helpers';
import Episode from './pages/episode/Episode';
import Home from './pages/home/Home';
import Podcast from './pages/podcast/Podcast';
import PodcastLayout from './pages/podcastLayout/PodcastLayout';

function App () {
	const [ isLoading, dispatchIsLoading ] = useReducer(loadingReducer, initialState);
	const { isLoadingParser, isLoadingBackendCall, isLoadingLocalStorage } = isLoading;
	const somethingIsLoading = isLoadingParser || isLoadingBackendCall || isLoadingLocalStorage;
	return (
		<div className="app-container">
			<BrowserRouter>
				<header className="header-container">
					<Link to="/">
						<h1 className="app-title">Podcaster</h1>
					</Link>
					{somethingIsLoading && <ClipLoader color="#2877bd" size={25} aria-label="loader"/>}
				</header>
				<main>
					<Routes>
						<Route path="/" element={<Home isLoading={somethingIsLoading} dispatchIsLoading={dispatchIsLoading}/>} />
						<Route
							path="/podcast"
							element={<PodcastLayout isLoading={somethingIsLoading} dispatchIsLoading={dispatchIsLoading} />}
						>
							<Route path=":id" element={<Podcast />} />
							<Route path=":id/episode/:episodeId" element={<Episode />} />
						</Route>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
