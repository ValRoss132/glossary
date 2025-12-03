import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/Card'
import type { IDefinition } from './types'

function App() {
	const [terms, setTerms] = useState<IDefinition[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const response = await fetch('http://127.0.0.1:8000/terms/')

				if (!response.ok) {
					throw new Error('Ошибка сети')
				}

				const data = (await response.json()) as IDefinition[]

				setTerms(data)
			} catch {
				setError('Ошибка загрузки данных')
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	return (
		<main>
			{isLoading && <p>Загрузка...</p>}
			{error && <p>{error}</p>}
			<section className='card-list'>
				{terms.map((term) => (
					<Card key={term.id} definition={term} />
				))}
			</section>
		</main>
	)
}

export default App
