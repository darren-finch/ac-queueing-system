import { useEffect, useState } from "react"
import { AircraftQueueComponent } from "./layouts/AircraftQueueComponent"
import { Aircraft } from "./logic/Aircraft"
import { LastDequeuedAircraftComponent } from "./layouts/LastDequeuedAircraftComponent"
import { aircraftTypes } from "./data/AircraftTypes"
import { aircraftQueueInstance } from "./logic/AircraftQueue"

const App = () => {
	const [listOfAircraftSubqueues, setlistOfAircraftSubqueues] = useState<Aircraft[][]>(
		aircraftTypes.map(() => [] as Aircraft[])
	)
	const [lastDequeuedAircraft, setLastDequeuedAircraft] = useState<Aircraft | undefined>(undefined)

	const [systemBooted, setSystemBooted] = useState(false)

	useEffect(() => {
		return aircraftQueueInstance.addListener({
			onAircraftEnqueued(listOfAircraftSubqueues) {
				setlistOfAircraftSubqueues(listOfAircraftSubqueues)
			},
			onAircraftDequeued(listOfAircraftSubqueues, aircraft) {
				setlistOfAircraftSubqueues(listOfAircraftSubqueues)
				setLastDequeuedAircraft(aircraft)
			},
		})
	})

	return (
		<div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
			{systemBooted ? (
				<>
					<AircraftQueueComponent listOfAircraftSubqueues={listOfAircraftSubqueues}></AircraftQueueComponent>
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
