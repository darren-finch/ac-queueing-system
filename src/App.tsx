import { useEffect, useState } from "react"
import { AircraftQueueComponent } from "./layouts/AircraftQueueComponent"
import { aircraftQueueRepository } from "./data/Repository"
import { Aircraft } from "./logic/aircraft"
import { LastDequeuedAircraftComponent } from "./layouts/LastDequeuedAircraftComponent"
import { aircraftTypes } from "./data/AircraftTypes"

const App = () => {
	const [listOfListsOfAircraft, setListOfListsOfAircraft] = useState<Aircraft[][]>(
		aircraftTypes.map(() => [] as Aircraft[])
	)
	const [lastDequeuedAircraft, setLastDequeuedAircraft] = useState<Aircraft | undefined>(undefined)

	const [systemBooted, setSystemBooted] = useState(false)

	useEffect(() => {
		return aircraftQueueRepository.addListener({
			onAircraftEnqueued(listOfListsOfAircraft) {
				setListOfListsOfAircraft(listOfListsOfAircraft)
			},
			onAircraftDequeued(listOfListsOfAircraft, aircraft) {
				setListOfListsOfAircraft(listOfListsOfAircraft)
				setLastDequeuedAircraft(aircraft)
			},
		})
	})

	return (
		<div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
			{systemBooted ? (
				<>
					<AircraftQueueComponent listOfListsOfAircraft={listOfListsOfAircraft}></AircraftQueueComponent>
					<LastDequeuedAircraftComponent
						lastDequeuedAircraft={lastDequeuedAircraft}></LastDequeuedAircraftComponent>
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
