import '../sass/custom-select.scss'
import { useState, useEffect } from 'react'
import React from 'react'
import { motion } from 'framer-motion'

const Select = ({ options, onClick, currentAirport }) => {
	const [showDropDownMenu, setShowDropDownMenu] = useState('hidden')
	const toggleDropDownMenu = () => {
		showDropDownMenu === 'hidden' ? setShowDropDownMenu('visible') : setShowDropDownMenu('hidden')
	}

	const variants = {
		visible: { scaleY: 1, originY: 0 },
		hidden: { scaleY: 0 },
	}
	return (
		<div className='custom-select'>
			<button className='select-btn' onClick={toggleDropDownMenu}>
				{currentAirport || 'Wybierz lotnisko'}
			</button>
			<motion.div
				className='options-container'
				initial='hidden'
				animate={showDropDownMenu}
				variants={variants}
				transition={{ type: 'tween', duration: 0.2 }}>
				{options.map(option => {
					return (
						<button
							key={option}
							className='option'
							onClick={e => {
								onClick(e)
								toggleDropDownMenu()
							}}>
							{option}
						</button>
					)
				})}
			</motion.div>
		</div>
	)
}

export default Select
