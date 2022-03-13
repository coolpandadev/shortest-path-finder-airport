import '../sass/route-display.scss'
import { motion } from 'framer-motion'

const RouteDisplay = ({ path }) => {
	let arrayOfAirports = path !== undefined ? path.split(' ') : []
	arrayOfAirports.splice(arrayOfAirports.length - 1, 1)

	return (
		<div className='route-container'>
			{arrayOfAirports.map((airport, counter) => {
				return (
					<motion.div
						key={airport}
						className='airport'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2, delay: counter * 0.3 }}>
						{airport}
					</motion.div>
				)
			})}
		</div>
	)
}

export default RouteDisplay
