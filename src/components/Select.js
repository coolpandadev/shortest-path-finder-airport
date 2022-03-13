import '../sass/custom-select.scss'
import { useState, useEffect } from 'react'
import React from 'react'
import { motion } from 'framer-motion'

const Select = ({ options, onClick, currentAirport }) => {
	const [showDropDownMenu, setShowDropDownMenu] = useState('hidden')
	const toggleDropDownMenu = () => {
		showDropDownMenu === 'hidden' ? setShowDropDownMenu('visible') : setShowDropDownMenu('hidden')
	}

	const dropDownVariants = {
		visible: { scaleY: 1, originY: 0 },
		hidden: { scaleY: 0 },
	}
	return (
		<div className='custom-select'>
			<motion.button
				className='select-btn'
				onClick={toggleDropDownMenu}
				whileHover={{ backgroundColor: '#555' }}
				transition={{ duration: 0.2 }}>
				{currentAirport || 'Wybierz lotnisko'}
			</motion.button>
			<motion.div
				className='options-container'
				initial='hidden'
				animate={showDropDownMenu}
				variants={dropDownVariants}
				transition={{ type: 'tween', duration: 0.2 }}>
				{options.map(option => {
					return (
						<motion.button
							key={option}
							className='option'
							whileHover={{ backgroundColor: '#555' }}
							transition={{ duration: 0.2 }}
							onClick={e => {
								onClick(e)
								toggleDropDownMenu()
							}}>
							{option}
						</motion.button>
					)
				})}
			</motion.div>
		</div>
	)
}

export default Select
