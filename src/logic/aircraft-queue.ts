import AircraftSubqueue from "./aircraft-subqueue"
import { Aircraft } from "./aircraft"
import AircraftType from "./aircraft-type"

class AircraftQueue {
	private aircraftSubqueues: AircraftSubqueue[] = []

	// The constructor technically would be the "system boot" operation
	constructor(aircraftTypes: AircraftType[]) {
		if (aircraftTypes.length < 1) {
			throw new Error("Aircraft types cannot be empty!")
		}

		aircraftTypes.forEach((aircraftType) => {
			this.aircraftSubqueues.push(new AircraftSubqueue(aircraftType))
		})
	}

	enqueue(aircraft: Aircraft) {
		const aircraftSubqueue = this.aircraftSubqueues.find((aircraftSubqueue) => {
			return aircraftSubqueue.aircraftType.getName() == aircraft.getName()
		})

		if (aircraftSubqueue == null) {
			throw new Error("This aircraft type is not supported")
		}

		aircraft.setEnqueuedTime(new Date())

		aircraftSubqueue.enqueue(aircraft)
	}

	dequeue() {
		if (this.isEmpty()) {
			throw new Error("No aircraft in queue")
		}

		let priorityOfSubsequenceInPrevLoop: number | null = null

		while (true) {
			let highestPrioritySubqueue = this.getNextHighestPrioritySubqueue(priorityOfSubsequenceInPrevLoop)

			if (highestPrioritySubqueue.isEmpty()) {
				priorityOfSubsequenceInPrevLoop = highestPrioritySubqueue.getPriority()
				continue
			}

			const aircraft = highestPrioritySubqueue.dequeue()!
			aircraft.setDequeuedTime(new Date())

			return aircraft
		}
	}

	private getNextHighestPrioritySubqueue(priorityOfSubsequenceInPrevLoop: number | null) {
		let highestPrioritySubqueue: AircraftSubqueue | null = null
		for (let i = 0; i < this.aircraftSubqueues.length; i++) {
			const currPriority = this.aircraftSubqueues[i].getPriority()

			if (priorityOfSubsequenceInPrevLoop != null && currPriority >= priorityOfSubsequenceInPrevLoop) {
				continue
			}

			if (highestPrioritySubqueue == null) {
				highestPrioritySubqueue = this.aircraftSubqueues[i]
				continue
			}

			if (currPriority > highestPrioritySubqueue.getPriority()) {
				highestPrioritySubqueue = this.aircraftSubqueues[i]
			}
		}
		return highestPrioritySubqueue!
	}

	isEmpty() {
		let isEmpty = true

		for (let i = 0; i < this.aircraftSubqueues.length; i++) {
			isEmpty = isEmpty && this.aircraftSubqueues[i].isEmpty()
		}

		return isEmpty
	}

	getListOfListsOfAircraft() {
		let listOfListsOfAircraft: Aircraft[][] = []

		for (let i = 0; i < this.aircraftSubqueues.length; i++) {
			listOfListsOfAircraft.push(this.aircraftSubqueues[i].toList())
		}

		return listOfListsOfAircraft
	}
}

export default AircraftQueue
