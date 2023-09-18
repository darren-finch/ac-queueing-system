import React from "react"
import { Aircraft } from "../../features/aircraft-queue/AircraftQueueSlice"

interface AircraftCardProps {
	aircraft: Aircraft
}

const AircraftCard: React.FC<AircraftCardProps> = ({ aircraft }) => {
	return (
		<li className="card my horizontal justify-start align-center">
			<p className="mx">Aircraft Type: {aircraft.name}</p>
			<p className="mx"> | </p>
			<p className="mx">
				Enqueued Time:{" "}
				{aircraft.enqueuedTime?.toLocaleTimeString(["en-US"], {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					hour12: true,
				})}
			</p>
		</li>
	)
}

export default AircraftCard
