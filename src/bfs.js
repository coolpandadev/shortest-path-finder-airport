//lotniska
const airports = [
	'ATH',
	'BSL',
	'BFS',
	'BLQ',
	'BTS',
	'BRS',
	'CRL',
	'BUD',
	'DUB',
	'EDI',
	'EIN',
	'GLA',
	'HAM',
	'CTA',
	'KEF',
	'CGN',
	'SUF',
	'LCA',
	'LPL',
	'LIS',
	'LTN',
	'STN',
	'MAD',
]
//trasy między lotniskami
const routes = [
	['ATH', 'EDI'],
	['ATH', 'GLA'],
	['ATH', 'CTA'],
	['BFS', 'CGN'],
	['BFS', 'LTN'],
	['BFS', 'CTA'],
	['BTS', 'STN'],
	['BTS', 'BLQ'],
	['CRL', 'BLQ'],
	['CRL', 'BSL'],
	['CRL', 'LTN'],
	['DUB', 'LCA'],
	['LTN', 'DUB'],
	['LTN', 'MAD'],
	['LCA', 'HAM'],
	['EIN', 'BUD'],
	['EIN', 'MAD'],
	['HAM', 'BRS'],
	['KEF', 'LPL'],
	['KEF', 'CGN'],
	['SUF', 'LIS'],
	['SUF', 'BUD'],
	['SUF', 'STN'],
	['STN', 'EIN'],
	['STN', 'HAM'],
	['STN', 'DUB'],
	['STN', 'KEF'],
]

//lista sąsiedstwa
const adjacencyList = new Map()

//funkcja dodająca lotniska do listy sąsiedstwa
const addAirport = airport => adjacencyList.set(airport, [])

// funkcja dodająca punkty docelowe dla danego lotniska
const addEdge = (origin, destination) => {
	adjacencyList.get(origin).push(destination)
	adjacencyList.get(destination).push(origin)
}

// usupełniam listę sąsiedstwa
airports.forEach(addAirport)
routes.forEach(route => addEdge(...route))

//funkcja przyjmuje kolekcje miejsc odwiedzonych przez BTS
//funkcja zwracająca jedną z najkrótszych ścieżek z punktu startowego do końcowego
const getAPath = visited => {
	let path = Array.from(visited)
	//pętla zaczynając od ostatniego elementu sprawdza czy następny jest połączony z poprzednim.
	//jeśli nie to go usuwa
	for (let i = path.length - 1; i > 1; i--) {
		const destinations = adjacencyList.get(path[i]) //pobieram tablicę dostępnych połączeń dla danego lotniska
		let isPath = false
		// sprawdzam w pętli czy następny element iteracji jest połączony z poprzednim
		for (let j = 0; j < destinations.length; j++) {
			if (path[i - 1] === destinations[j]) {
				isPath = true
				break
			}
		}
		if (isPath === false) path.splice(i - 1, 1) //jeśli nie jest to go usuwam
	}
	let pathAsString = ''
	path.forEach(element => {
		pathAsString += element + ' '
	})
	return pathAsString
}

//Zmodywikowana funkcja przeszukiwania wszerz (z ang. Breadth-first Search (BFS))
//zwraca kolekcję lotnisk odwiedzonych przez algorytm z punktu startowego do punktu końcowego
function bfs(start, end) {
	if (start === end) return start
	const visited = new Set() //odwiedzone lotniska przez graf.
	const queue = [start] //kolejka lotnisk do sprawdzenia
	while (queue.length > 0) {
		const airport = queue.shift() // pobieram pierwsze lotnisko z zkolejki
		visited.add(airport) //dodaje lotnisko do odwiezonych
		const destinations = adjacencyList.get(airport) // pobieram listę następnych lotnisk połączonych z danym lotniskiem

		for (const destination of destinations) {
			//jeśli któreś z następnych lotnisk jest tym docelowym oznaczam je jako odwiedzone i zwracam kolekcje wszytskich odwiedzonych lotnisk przez algorytm
			if (destination === end) {
				visited.add(end)
				return getAPath(visited)
			}
			//jeśli dane lotnisko nie zostało odwiedzone to dodaje je do kolejki lotnisk do odwiedzenia na sam koniec
			if (!visited.has(destination)) queue.push(destination)
		}
	}
}

export { bfs, airports }
