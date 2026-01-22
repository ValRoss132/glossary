import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import { Header } from './components/header'
import { GlossaryPage } from './pages/glossary-page/glossary-page'
import { MindMapPage } from './pages/mind-map-page/mind-map-page'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/glossary' element={<GlossaryPage />} />
				<Route path='/glossary/mind-map' element={<MindMapPage />} />
				<Route path='*' element={<Navigate to='/glossary' replace />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
