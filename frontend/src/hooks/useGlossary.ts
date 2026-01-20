import { useEffect, useState } from 'react'
import type { IDefinition } from '../types'

export const useGlossary = () => {
	const [terms, setTerms] = useState<IDefinition[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const API_URL = import.meta.env.VITE_API_URL

	console.log(API_URL)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const response = await fetch(`${API_URL}/terms`)

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
	}, [API_URL])

	return { terms, isLoading, error }
}
