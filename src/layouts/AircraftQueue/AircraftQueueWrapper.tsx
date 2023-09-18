import React from "react"
import { AircraftQueueComponent } from "./AircraftQueueComponent"
import { LastDequeuedAircraftComponent } from "../LastDequeuedAircraftComponent"
import { AircraftQueue, bootSystem } from "../../features/aircraft-queue/AircraftQueueSlice"
import { useDispatch } from "react-redux"

interface AircraftQueueWrapperProps {
	aircraftQueue: AircraftQueue
}

const AircraftQueueWrapper: React.FC<AircraftQueueWrapperProps> = ({ aircraftQueue }) => {
	const dispatch = useDispatch()

	return (
		<>
			{aircraftQueue.isBooted ? (
				<>
					<AircraftQueueComponent aircraftQueue={aircraftQueue}></AircraftQueueComponent>
					<LastDequeuedAircraftComponent
						lastDequeuedAircraft={aircraftQueue.lastDequeuedAircraft}></LastDequeuedAircraftComponent>
				</>
			) : (
				<div className="card horizontal justify-center align-center">
					<button onClick={() => dispatch(bootSystem())}>Boot System</button>
				</div>
			)}
		</>
	)
}

export default AircraftQueueWrapper
