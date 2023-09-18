import React from "react"
import { STARTING_AIRCRAFT_TYPES } from "../../features/aircraft-queue/AircraftQueueSlice"

interface AircraftQueueHeaderProps {
	onEnqueueNewAircraft: (aircraftType: string) => void
	onDequeueAircraft: () => void
}

const AircraftQueueHeader: React.FC<AircraftQueueHeaderProps> = ({ onEnqueueNewAircraft, onDequeueAircraft }) => {
	const handleEnqueueNewAircraft = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const aircraftTypeSelect = document.getElementById("aircraftTypeSelect") as HTMLSelectElement
		const aircraftType = STARTING_AIRCRAFT_TYPES.find(
			(aircraftType: any) => aircraftType.name === aircraftTypeSelect.value
		)
		if (aircraftType === undefined) {
			throw new Error("Aircraft type not found")
		}
		onEnqueueNewAircraft(aircraftType.name)
	}

	return (
		<>
			<div className="horizontal align-center">
				<h1 className="my-0 me">Aircraft Queue</h1>
				<form className="horizontal align-center" onSubmit={handleEnqueueNewAircraft}>
					<label className="mx" htmlFor="aircraftTypeSelect">
						Select Aircraft Type
					</label>
					<select className="mx" name="aircraftTypeSelect" id="aircraftTypeSelect">
						{STARTING_AIRCRAFT_TYPES.map((aircraftType, index) => {
							return (
								<option key={index} value={aircraftType.name}>
									{aircraftType.name}
								</option>
							)
						})}
					</select>
					<button className="mx" type="submit">
						Enqueue New Aircraft
					</button>
				</form>
				<button className="mx" onClick={() => onDequeueAircraft()}>
					Dequeue Aircraft
				</button>
			</div>
			<p>(higher priority numbers come first)</p>
		</>
	)
}

export default AircraftQueueHeader
