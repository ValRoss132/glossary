import React from 'react'
import { Card } from '../../components/card'
import { useGlossary } from '../../hooks/useGlossary'

export const GlossaryPage: React.FC = () => {
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
		</main>
	)
}
