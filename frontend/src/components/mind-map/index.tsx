import React, { useMemo } from 'react'
import type { Edge, Node } from 'reactflow'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { useGlossary } from '../../hooks/useGlossary'
import { CenteredNode } from '../centered-node'
import { generateRelations } from '../utils'

const style = {
	width: '1280px',
	height: 'calc(100vh - 120px)',
}

const nodeTypes = {
	centered: CenteredNode,
}

export const MindMap: React.FC = () => {
	const { terms, isLoading, error } = useGlossary()

	const nodes: Node[] = useMemo(() => {
		if (!terms || terms.length === 0) return []

		const typedTerms = terms
		const centerTerm =
			typedTerms.find((t) => t.term === 'Реактивное программирование') ||
			typedTerms[0]
		const centerId = centerTerm.id

		const innerRadius = 350
		const outerRadius = 250

		const innerCircle = typedTerms.filter(
			(t) =>
				t.id !== centerId &&
				(t.links_to.some((l) => l.to_term_id === centerId) ||
					t.links_from.some((l) => l.from_term_id === centerId))
		)

		const periphery = typedTerms.filter(
			(t) => t.id !== centerId && !innerCircle.some((it) => it.id === t.id)
		)

		const angleStep = (2 * Math.PI) / (innerCircle.length || 1)

		return typedTerms.map((term) => {
			let x = 0,
				y = 0
			const isCenter = term.id === centerId
			const innerIdx = innerCircle.findIndex((t) => t.id === term.id)

			if (isCenter) {
				x = 0
				y = 0
			} else if (innerIdx !== -1) {
				const angle = innerIdx * angleStep
				x = innerRadius * Math.cos(angle)
				y = innerRadius * Math.sin(angle)
			} else {
				const parent = innerCircle.find(
					(it) =>
						term.links_to.some((l) => l.to_term_id === it.id) ||
						term.links_from.some((l) => l.from_term_id === it.id)
				)

				if (parent) {
					const parentIdx = innerCircle.findIndex((it) => it.id === parent.id)
					const baseAngle = parentIdx * angleStep
					const siblings = periphery.filter(
						(p) =>
							p.links_to.some((l) => l.to_term_id === parent.id) ||
							p.links_from.some((l) => l.from_term_id === parent.id)
					)
					const siblingIdx = siblings.findIndex((s) => s.id === term.id)
					const fanAngle =
						baseAngle + (siblingIdx - (siblings.length - 1) / 2) * 0.3

					x = (innerRadius + outerRadius) * Math.cos(fanAngle)
					y = (innerRadius + outerRadius) * Math.sin(fanAngle)
				} else {
					const idx = typedTerms.indexOf(term)
					x = (innerRadius + outerRadius * 1.5) * Math.cos(idx)
					y = (innerRadius + outerRadius * 1.5) * Math.sin(idx)
				}
			}

			return {
				id: term.id.toString(),
				type: 'centered',
				data: {
					label: term.term,
					isCenter: isCenter,
					isInner: innerIdx !== -1,
				},
				position: { x, y },
				style: { zIndex: 10 },
			}
		})
	}, [terms])

	const edges: Edge[] = useMemo(() => {
		if (!terms) return []
		const rels = generateRelations(terms)

		return rels.map((r) => ({
			id: `e-${r.source}-${r.target}`,
			source: r.source.toString(),
			target: r.target.toString(),
			label: r.label,
			animated: true,
			type: 'straight',
			style: {
				stroke: 'var(--night-accent)',
				strokeWidth: 1.5,
				opacity: 0.3,
			},
			labelStyle: {
				fill: 'var(--night-text-secondary)',
				fontWeight: 500,
				fontSize: 10,
			},
			labelBgStyle: { fill: 'var(--night-bg)', fillOpacity: 0.8 },
			labelBgPadding: [4, 2],
			labelBgBorderRadius: 4,
		}))
	}, [terms])

	if (isLoading) return <div>Загрузка терминов...</div>
	if (error) return <div>Ошибка: {error}</div>

	return (
		<div
			className='graph-container'
			style={{
				background: 'var(--night-bg)',
				width: '100%',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div className='graph' style={style}>
				<ReactFlow nodes={nodes} edges={edges} fitView nodeTypes={nodeTypes}>
					<Background color='#ccc' gap={20} />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	)
}
