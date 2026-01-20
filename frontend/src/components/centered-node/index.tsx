import React from 'react'
import { Handle, type NodeProps, Position } from 'reactflow'

interface NodeData {
	label: string
	isCenter?: boolean
	isInner?: boolean
}

export const CenteredNode: React.FC<NodeProps<NodeData>> = ({ data }) => {
	const nodeStyle: React.CSSProperties = {
		background: data.isCenter ? 'var(--night-primary)' : 'var(--night-surface)',
		color: 'var(--night-text)',
		border: `1px solid ${
			data.isCenter ? 'var(--night-accent)' : 'var(--night-text-secondary)'
		}`,
		borderRadius: '12px',
		width: '160px',
		height: '50px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '12px',
		fontWeight: data.isCenter ? '600' : '400',
		boxShadow: data.isCenter ? '0 0 20px rgba(91, 140, 255, 0.3)' : 'none',
		position: 'relative',
		transition: 'all 0.3s ease',
	}

	return (
		<div style={nodeStyle}>
			<Handle
				type='target'
				position={Position.Top}
				style={{
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					opacity: 0,
				}}
			/>
			<Handle
				type='source'
				position={Position.Bottom}
				style={{
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					opacity: 0,
				}}
			/>
			<div style={{ padding: '0 10px', textAlign: 'center' }}>{data.label}</div>
		</div>
	)
}
