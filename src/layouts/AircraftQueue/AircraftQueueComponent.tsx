import React from "react"
import { useDispatch } from "react-redux"
import {
	AircraftQueue,
	STARTING_AIRCRAFT_TYPES,
	dequeue,
	enqueue,
	isEmpty,
} from "../../features/aircraft-queue/AircraftQueueSlice"
import AircraftQueueHeader from "./AircraftQueueHeader"
import AircraftSubqueuesList from "./AircraftSubqueuesList"

interface AircraftQueueComponentProps {
	aircraftQueue: AircraftQueue
}

export const AircraftQueueComponent: React.FC<AircraftQueueComponentProps> = ({ aircraftQueue }) => {
	const dispatch = useDispatch()

	const handleEnqueueNewAircraft = (aircraftType: string) => {
		dispatch(enqueue({ name: aircraftType }))
	}

	const handleDequeueAircraft = () => {
		if (isEmpty(aircraftQueue)) {
			alert("Aircraft queue is empty")
		} else {
			dispatch(dequeue())
		}
	}

	return (
		<>
			<AircraftQueueHeader
				onEnqueueNewAircraft={handleEnqueueNewAircraft}
				onDequeueAircraft={handleDequeueAircraft}
			/>
			<AircraftSubqueuesList aircraftSubqueues={aircraftQueue.aircraftSubqueues} />
		</>
	)
}
