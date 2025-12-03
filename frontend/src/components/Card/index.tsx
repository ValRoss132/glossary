import React from 'react'

import type { IDefinition } from '../../types'
import { getDomain } from '../utils'
import './style.css'

type CardProps = {
	definition: IDefinition
}

export const Card: React.FC<CardProps> = ({ definition }) => {
	const domain = getDomain(definition.source)
	return (
		<article className='card'>
			<dl>
				<div className='term-container'>
					<dt className='term'>{definition.term}</dt>
					<a className='link' target='_blank' href={definition.source}>
						{domain}
					</a>
				</div>
				<dd className='definition'>&mdash; {definition.definition}</dd>
			</dl>
		</article>
	)
}
