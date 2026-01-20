import React from 'react'
import { Link } from 'react-router'
import './styles.css'

type ButtonLinkProps = {
	to: string
	children: React.ReactNode
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ to, children }) => {
	return (
		<Link to={to} className='button-link'>
			{children}
		</Link>
	)
}
