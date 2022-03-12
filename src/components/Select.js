import { computeHeadingLevel } from '@testing-library/react'
import React from 'react'
const Select = ({ value, options, onChange }) => {
	return (
		<select className='select' value={value} onChange={onChange}>
			{options.map(option => {
				return (
					<option className='select__option' key={option} value={option}>
						{option}
					</option>
				)
			})}
		</select>
	)
}

export default Select
