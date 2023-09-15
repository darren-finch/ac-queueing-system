import React from "react"
import { Aircraft } from "../logic/aircraft"
import { aircraftTypes } from "../data/AircraftTypes"
import { aircraftQueueRepository } from "../data/Repository"

interface AircraftQueueComponentProps {
	listOfListsOfAircraft: Aircraft[][]
}

export const AircraftQueueComponent: React.FC<AircraftQueueComponentProps> = ({ listOfListsOfAircraft }) => {
	const handleEnqueueNewAircraft = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const aircraftTypeSelect = document.getElementById("aircraftTypeSelect") as HTMLSelectElement
		const aircraftType = aircraftTypes.find((aircraftType) => aircraftType.getName() === aircraftTypeSelect.value)
		if (aircraftType === undefined) {
			throw new Error("Aircraft type not found")
		}
		aircraftQueueRepository.enqueue(aircraftType.getName())
	}

	const handleDequeueAircraft = () => {
		if (aircraftQueueRepository.isEmpty()) {
			alert("Aircraft queue is empty")
		} else {
			aircraftQueueRepository.dequeue()
		}
	}

	return (
		<div>
			<div className="horizontal align-center">
				<h1 className="my-0 me">Aircraft Queue</h1>
				<form className="horizontal align-center" onSubmit={handleEnqueueNewAircraft}>
					<label className="mx" htmlFor="aircraftTypeSelect">
						Select Aircraft Type
					</label>
					<select className="mx" name="aircraftTypeSelect" id="aircraftTypeSelect">
						{aircraftTypes.map((aircraftType, index) => {
							return (
								<option key={index} value={aircraftType.getName()}>
									{aircraftType.getName()}
								</option>
							)
						})}
					</select>
					<button className="mx" type="submit">
						Enqueue New Aircraft
					</button>
				</form>
				<button className="mx" onClick={() => handleDequeueAircraft()}>
					Dequeue Aircraft
				</button>
			</div>
			<p>(higher priority numbers come first)</p>

			<ul>
				{listOfListsOfAircraft.map((listOfAircraft, index) => {
					return (
						<div key={index} className="card my px py">
							<h2 className="my-0">Priority {listOfListsOfAircraft.length - (index + 1)} Aircraft</h2>
							<li>
								<ul>
									{listOfAircraft.map((aircraft, index) => {
										return (
											<li className="card my horizontal justify-start align-center" key={index}>
												<p className="mx">Aircraft Type: {aircraft.getName()}</p>
												<p className="mx"> | </p>
												<p className="mx">
													Enqueued Time:{" "}
													{aircraft.getEnqueuedTime()?.toLocaleTimeString(["en-US"], {
														hour: "2-digit",
														minute: "2-digit",
														second: "2-digit",
														hour12: true,
													})}
												</p>
											</li>
										)
									})}
								</ul>
							</li>
						</div>
					)
				})}
			</ul>
		</div>
	)
}
