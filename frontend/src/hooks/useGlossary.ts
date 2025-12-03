import { useEffect, useState } from 'react'
import type { IDefinition } from '../types'

export const useGlossary = () => {
	const [terms, setTerms] = useState<IDefinition[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const response = await fetch('http://127.0.0.1:8000/terms')

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

	return { terms, isLoading, error }
}
