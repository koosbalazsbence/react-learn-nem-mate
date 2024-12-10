import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import InstrumentListPage from './components/InstrumentListPage'
import InstrumentSinglePage from './components/InstrumentSinglePage'
import InstrumentCreatePage from './components/InstrumentCreatePage'
import InstrumentUpdatePage from './components/InstrumentUpdatePage'

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
				<Route path="*" element={<div className='flex items-center justify-center h-screen'><h1 className='text-4xl'>404</h1></div>} />
				<Route
					path="/edit-instrument/:instrumentId"
					element={<InstrumentUpdatePage />}
				></Route>
			</Routes>
		</Router>
	)
}
