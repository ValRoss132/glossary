import './App.css'
import { Card } from './components/Card'
import { MindMap } from './components/MindMap'
import { useGlossary } from './hooks/useGlossary'

function App() {
	const { terms, isLoading, error } = useGlossary()

	return (
		<main>
			{isLoading && <p>Загрузка...</p>}
			{error && <p>{error}</p>}
			<section className='card-list'>
				{terms.map((term) => (
					<Card key={term.id} definition={term} />
				))}
			</section>
			<MindMap />
		</main>
	)
}

export default App
