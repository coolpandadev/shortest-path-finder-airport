import './App.scss'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Select from './components/Select'
import RouteDisplay from './components/RouteDisplay'
import { airports, bfs } from './bfs'
function App() {
	const [startLoc, setStartLoc] = useState()
	const [endLoc, setEndLoc] = useState()
	const [path, setPath] = useState()
	const submitStartAirportChange = e => {
		setStartLoc(e.target.textContent)
	}
	const submitEndAirportChange = e => {
		setEndLoc(e.target.textContent)
	}
	useEffect(() => {
		if (startLoc !== undefined && endLoc !== undefined) {
			if (startLoc === endLoc) {
				setPath('')
			} else {
				setPath(bfs(startLoc, endLoc))
			}
		}
	}, [startLoc, endLoc])

	return (
		<div className='container'>
			<h1 className='header'>Shortest Path Finder</h1>

			<div className='select-container'>
				<Select options={airports} onClick={submitStartAirportChange} currentAirport={startLoc} />
				<Select options={airports} onClick={submitEndAirportChange} currentAirport={endLoc} />
			</div>

			<motion.p >
				{startLoc !== undefined && endLoc !== undefined
					? `The shortest path from airport ${startLoc} to airport ${endLoc} is:  `
					: ''}
			</motion.p>
			<p className='p-info'>{path === '' ? "You dont't need to travel anywhere, you are arleady here." : path}</p>
			<RouteDisplay path={path} />
		</div>
	)
}

export default App
