import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';

import DeckPage from './Pages/DeckPage';
import TrainingPage from './Pages/TrainingPage';
import MemoryCardPage from './Pages/MemoryCardPage/MemoryCardPage';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/decks" element={<DeckPage />}>
					<Route
						path=":deckId"
						element={<MemoryCardPage />}
					/>
				</Route>
				<Route
					path="/training/:id"
					element={<TrainingPage />}
				/>
				<Route
					path="*"
					element={<>You are lost</>}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
