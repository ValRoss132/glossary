import type { TermWithRelations } from '../types'

export const getDomain = (str: string) => {
	if (!str) {
		return ''
	}

	try {
		return new URL(str).hostname
	} catch {
		return ''
	}
}

export const generateRelations = (terms: TermWithRelations[]) => {
	const edges: { source: number; target: number; label: string }[] = []
	const edgeIds = new Set<string>()

	terms.forEach((term) => {
		term.links_to.forEach((rel) => {
			const edgeId = `${rel.from_term_id}-${rel.to_term_id}`

			if (!edgeIds.has(edgeId)) {
				edges.push({
					source: rel.from_term_id,
					target: rel.to_term_id,
					label: rel.relation_type,
				})
				edgeIds.add(edgeId)
			}
		})
	})

	return edges
}
