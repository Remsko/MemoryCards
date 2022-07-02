import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';

import DeckPage from './Pages/DeckPage';
import TrainingPage from './Pages/TrainingPage';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DeckPage />} />
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
