import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AppRoutes } from './app-routes'
import './App.css'
import { Header } from './components/header'
import { GlossaryPage } from './pages/glossary-page/glossary-page'
import { MindMapPage } from './pages/mind-map-page/mind-map-page'

function App() {
	return (
		<BrowserRouter basename='/glossary'>
			<Header />
			<Routes>
				<Route path={AppRoutes.List} element={<GlossaryPage />} />
				<Route path={AppRoutes.MindMap} element={<MindMapPage />} />
				<Route path='*' element={<Navigate to={AppRoutes.List} replace />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
