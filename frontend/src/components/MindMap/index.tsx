import React, { useMemo } from 'react'
import type { Edge, Node } from 'reactflow'
import ReactFlow, { Position } from 'reactflow'
import 'reactflow/dist/style.css'
import { useGlossary } from '../../hooks/useGlossary'
import { generateRelations } from '../utils'

export const MindMap: React.FC = () => {
	const { terms, isLoading, error } = useGlossary()

	// nodes
	const nodes: Node[] = useMemo(() => {
		if (!terms) return []
		return terms.map((term, index) => ({
			id: term.id.toString(),
			data: { label: term.term },
			position: { x: 200 * (index % 5), y: 100 * Math.floor(index / 5) }, // простая сетка
			sourcePosition: Position.Right,
			targetPosition: Position.Left,
		}))
	}, [terms])

	// edges
	const edges: Edge[] = useMemo(() => {
		if (!terms) return []
		const rels = generateRelations(terms)
		return rels.map((r) => ({
			id: `e-${r.source}-${r.target}`,
			source: r.source.toString(),
			target: r.target.toString(),
			animated: true,
		}))
	}, [terms])

	if (isLoading) return <div>Загрузка терминов...</div>
	if (error) return <div>Ошибка: {error}</div>

	return (
		<div style={{ width: '100%', height: '600px' }}>
			<ReactFlow nodes={nodes} edges={edges} fitView />
		</div>
	)
}
