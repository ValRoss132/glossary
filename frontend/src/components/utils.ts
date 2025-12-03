import type { IDefinition } from '../types'

export const getDomain = (str: string) => {
	return new URL(str).hostname
}

export const generateRelations = (items: IDefinition[]) => {
	const edges: { source: number; target: number }[] = []

	for (let i = 0; i < items.length; i++) {
		for (let j = i + 1; j < items.length; j++) {
			const a = items[i].term.toLowerCase()
			const b = items[j].term.toLowerCase()

			const similar = a.includes(b.slice(0, 3)) || b.includes(a.slice(0, 3))

			if (similar) {
				edges.push({ source: items[i].id, target: items[j].id })
			}
		}
	}

	if (edges.length === 0 && items.length > 1) {
		for (let i = 1; i < items.length; i++) {
			edges.push({ source: items[0].id, target: items[i].id })
		}
	}

	return edges
}
