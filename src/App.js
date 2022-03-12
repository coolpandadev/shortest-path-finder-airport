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
		setPath(bfs(startLoc, endLoc))
	}, [startLoc, endLoc])

	return (
		<div className='container'>
			<h1 className='header'>Shortest Path Finder</h1>

			<Select options={airports} onClick={submitStartAirportChange} currentAirport={startLoc} />
			<Select options={airports} onClick={submitEndAirportChange} currentAirport={endLoc} />

			<p>{`Najszybsza droga z lotniska ${startLoc} do lotniska ${endLoc} to:  `}</p>
			<p>{path}</p>
		</div>
	)
}

export default App