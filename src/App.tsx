import { useState } from "react"
import { AircraftQueueComponent } from "./layouts/AircraftQueue/AircraftQueueComponent"
import { LastDequeuedAircraftComponent } from "./layouts/LastDequeuedAircraftComponent"
import { useSelector } from "react-redux"

const App = () => {
	const aircraftQueue = useSelector((state: any) => state.aircraftQueue)
	const lastDequeuedAircraft = useSelector((state: any) => state.lastDequeuedAircraft)

	const [systemBooted, setSystemBooted] = useState(false)

	return (
		<div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
			{systemBooted ? (
				<>
					<AircraftQueueComponent aircraftQueue={aircraftQueue}></AircraftQueueComponent>
					<LastDequeuedAircraftComponent
						lastDequeuedAircraft={aircraftQueue.lastDequeuedAircraft}></LastDequeuedAircraftComponent>
				</>
			) : (
				<div className="card horizontal justify-center align-center">
					<button onClick={() => setSystemBooted(true)}>Boot System</button>
				</div>
			)}
		</div>
	)
}

export default App
