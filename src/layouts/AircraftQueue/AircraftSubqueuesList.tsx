import React from "react"
import AircraftSubqueueComponent from "./AircraftSubqueueComponent"
import { AircraftSubqueue } from "../../features/aircraft-queue/AircraftQueueSlice"

interface AircraftSubqueuesListProps {
	aircraftSubqueues: AircraftSubqueue[]
}

const AircraftSubqueuesList: React.FC<AircraftSubqueuesListProps> = ({ aircraftSubqueues }) => {
	return (
		<ul>
			{aircraftSubqueues.map((aircraftSubqueue, index) => {
				return (
					<AircraftSubqueueComponent
						aircraftSubqueue={aircraftSubqueue}
						subqueueIndex={index}
						numberOfAircraftSubqueues={aircraftSubqueues.length}
					/>
				)
			})}
		</ul>
	)
}

export default AircraftSubqueuesList
