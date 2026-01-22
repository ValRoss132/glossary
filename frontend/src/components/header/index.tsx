import React from 'react'
import { AppRoutes } from '../../app-routes'
import { ButtonLink } from '../button-link'
import './styles.css'

export const Header: React.FC = () => {
	return (
		<header className='header'>
			<div className='header-container'>
				<nav className='header-nav'>
					<ButtonLink to={AppRoutes.List}>Glossary</ButtonLink>
					<ButtonLink to={AppRoutes.MindMap}>Mind Map</ButtonLink>
				</nav>
			</div>
		</header>
	)
}
