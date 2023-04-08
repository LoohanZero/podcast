import './app.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';

function App () {
	return (
		<>
			<header>
				<h1 className="app-title">Podcaster</h1>
			</header>
			<BrowserRouter>
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
