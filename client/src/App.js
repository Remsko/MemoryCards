import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';

import MemoryCardList from './Components/MemoryCardList';
import DeckPage from './Pages/DeckPage';
import TrainingPage from './Pages/TrainingPage';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="decks" element={<DeckPage />}>
					<Route
						path=":deckId"
						element={<MemoryCardList />}
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
