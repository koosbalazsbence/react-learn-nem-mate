import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import InstrumentListPage from './components/InstrumentListPage'
import InstrumentSinglePage from './components/InstrumentSinglePage'
import InstrumentCreatePage from './components/InstrumentCreatePage'

export default function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<InstrumentListPage />} />
				<Route
					path="/instrument/:instrumentId"
					element={<InstrumentSinglePage />}
				/>
				<Route
					path="/new-instrument"
					element={<InstrumentCreatePage />}
				/>
			</Routes>
		</Router>
	)
}
