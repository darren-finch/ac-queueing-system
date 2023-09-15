import { Aircraft } from "../logic/aircraft"

export interface LastDequeuedAircraftComponentProps {
	lastDequeuedAircraft: Aircraft | undefined
}

export const LastDequeuedAircraftComponent: React.FC<LastDequeuedAircraftComponentProps> = ({
	lastDequeuedAircraft,
}) => {
	return (
		<div>
			<h1>Last Dequeued Aircraft</h1>
			{lastDequeuedAircraft === undefined ? (
				<p>No aircraft has been dequeued yet.</p>
			) : (
				<div className="card horizontal justify-start align-center">
					<p className="mx">Aircraft Type: {lastDequeuedAircraft.getName()}</p>
					<p className="mx"> | </p>
					<p className="mx">
						Enqueued Time:{" "}
						{lastDequeuedAircraft.getEnqueuedTime()?.toLocaleTimeString(["en-US"], {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							hour12: true,
						})}
					</p>
					<p className="mx"> | </p>
					<p className="mx">
						Dequeued Time:{" "}
						{lastDequeuedAircraft.getDequeuedTime()?.toLocaleTimeString(["en-US"], {
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
