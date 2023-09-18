import React from "react"
import { AircraftSubqueue } from "../../features/aircraft-queue/AircraftQueueSlice"
import AircraftCard from "./AircraftCard"

interface AircraftSubqueueComponentProps {
	aircraftSubqueue: AircraftSubqueue
	subqueueIndex: number
	numberOfAircraftSubqueues: number
}

const AircraftSubqueueComponent: React.FC<AircraftSubqueueComponentProps> = ({
	aircraftSubqueue,
	subqueueIndex,
	numberOfAircraftSubqueues,
}) => {
	return (
		<div className="card my px py">
			<h2 className="my-0">Priority {numberOfAircraftSubqueues - (subqueueIndex + 1)} Aircraft</h2>
			<li>
				<ul>
					{aircraftSubqueue.aircraft.map((aircraft, index) => {
						return <AircraftCard aircraft={aircraft} />
					})}
				</ul>
			</li>
		</div>
	)
}

export default AircraftSubqueueComponent
