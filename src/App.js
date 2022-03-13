import './App.scss'
import { useState, useEffect } from 'react'
import Select from './components/Select'
import { airports, bfs } from './bfs'
function App() {
	const [startLoc, setStartLoc] = useState()
	const [endLoc, setEndLoc] = useState()
	const [path, setPath] = useState('Tutaj pojawi się Twoja trasa')

	const submitStartAirportChange = e => {
		setStartLoc(e.target.textContent)
	}
	const submitEndAirportChange = e => {
		setEndLoc(e.target.textContent)
	}
	useEffect(() => {
		// console.log(typeof pathToDisplay)
		let pathToDisplay = bfs(startLoc, endLoc)
		if (typeof pathToDisplay !== 'string' && pathToDisplay !== undefined) {
			for (let i = 0; i < pathToDisplay.length - 1; i++) {
				pathToDisplay[i] += ' ==> '
			}
		}
		setPath(pathToDisplay)
	}, [startLoc, endLoc])

	const paragraphDisplay = startLoc !== undefined && endLoc !== undefined ? { display: 'block' } : { display: 'none' }

	return (
		<div className='container'>
			<h1 className='header'>Shortest Path Finder</h1>

			<div className='select-container'>
				<Select options={airports} onClick={submitStartAirportChange} currentAirport={startLoc} />
				<Select options={airports} onClick={submitEndAirportChange} currentAirport={endLoc} />
			</div>

			<p
				className='p-info'
				style={paragraphDisplay}>{`Najszybsza droga z lotniska ${startLoc} do lotniska ${endLoc} to:  `}</p>
			<p style={paragraphDisplay}>{path}</p>
		</div>
	)
}

export default App
