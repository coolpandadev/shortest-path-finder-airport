import './App.scss'
import { useState } from 'react'
import Select from './components/Select'
import { airports, bfs } from './bfs'
function App() {
	const [startLoc, setStartLoc] = useState(airports[0])
	const [endLoc, setEndLoc] = useState(airports[1])
	const [path, setPath] = useState('Tutaj pojawi się Twoja trasa')
	const handleStartLocChange = e => setStartLoc(e.target.value)
	const onClick = () => {
		let bfsOutput = bfs(startLoc, endLoc)
		if (typeof bfsOutput !== 'string') {
			for (let i = 0; i < bfsOutput.length - 1; i++) {
				bfsOutput[i] += ' ==> '
			}
		}
		setPath(bfsOutput)
	}

	const handleEndLocChange = e => {
		setEndLoc(e.target.value)
	}
	const showPath = second => {}
	return (
		<div className='container'>
			<h1 className='header'>Shortest Path Finder</h1>
			<Select value={startLoc} options={airports} onChange={handleStartLocChange} />
			<Select value={endLoc} options={airports} onChange={handleEndLocChange} />
			<button className='button' onClick={onClick}>
				Pokaż najkrótszą drogę
			</button>
			<p>{`Najszybsza droga z lotniska ${startLoc} do lotniska ${endLoc} to:  `}</p>
			<p>{path}</p>
		</div>
	)
}

export default App
