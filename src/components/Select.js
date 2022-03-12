import '../sass/custom-select.scss'
import { useState } from 'react'
import React from 'react'
const Select = ({ options, onClick, currentAirport }) => {
	const [showDropDownMenu, setShowDropDownMenu] = useState(false)
	const toggleDropDownMenu = () => {
		setShowDropDownMenu(!showDropDownMenu)
	}
	return (
		<div className='custom-select'>
			<button className='select-btn' onClick={toggleDropDownMenu}>
				{currentAirport || 'Wybierz lotnisko'}
			</button>
			<div className='options-container' style={showDropDownMenu ? { display: 'flex' } : { display: 'none' }}>
				{options.map(option => {
					return (
						<p
							key={option}
							className='option'
							onClick={e => {
								onClick(e)
								toggleDropDownMenu()
							}}>
							{option}
						</p>
					)
				})}
			</div>
		</div>
	)
}

export default Select
