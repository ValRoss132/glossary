import React from 'react'
import { ButtonLink } from '../button-link'
import './styles.css'

export const Header: React.FC = () => {
	return (
		<header className='header'>
			<div className='header-container'>
				<nav className='header-nav'>
					<ButtonLink to='/glossary'>Glossary</ButtonLink>
					<ButtonLink to='/glossary/mind-map'>Mind Map</ButtonLink>
				</nav>
			</div>
		</header>
	)
}
