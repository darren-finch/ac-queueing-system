import { Aircraft } from "../features/aircraft-queue/AircraftQueueSlice"

export interface LastDequeuedAircraftComponentProps {
	lastDequeuedAircraft: Aircraft | null | undefined
}

export const LastDequeuedAircraftComponent: React.FC<LastDequeuedAircraftComponentProps> = ({
	lastDequeuedAircraft,
}) => {
	return (
		<div>
			<h1>Last Dequeued Aircraft</h1>
			{lastDequeuedAircraft === null || lastDequeuedAircraft === undefined ? (
				<p>No aircraft has been dequeued yet.</p>
			) : (
				<div className="card horizontal justify-start align-center">
					<p className="mx">Aircraft Type: {lastDequeuedAircraft.name}</p>
					<p className="mx"> | </p>
					<p className="mx">
						Enqueued Time:{" "}
						{lastDequeuedAircraft.enqueuedTime?.toLocaleTimeString(["en-US"], {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							hour12: true,
						})}
					</p>
					<p className="mx"> | </p>
					<p className="mx">
						Dequeued Time:{" "}
						{lastDequeuedAircraft.dequeuedTime?.toLocaleTimeString(["en-US"], {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							hour12: true,
						})}
					</p>
				</div>
			)}
		</div>
	)
}
