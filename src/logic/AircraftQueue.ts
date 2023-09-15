import AircraftSubqueue from "./AircraftSubqueue"
import { Aircraft } from "./Aircraft"
import AircraftType from "./AircraftType"
import { aircraftTypes } from "../data/AircraftTypes"

export interface AircraftQueueListener {
	onAircraftEnqueued: (listOfAircraftSubqueues: Aircraft[][]) => void
	onAircraftDequeued: (listOfAircraftSubqueues: Aircraft[][], dequeuedAircraft: Aircraft) => void
}

class AircraftQueue {
	private aircraftSubqueues: AircraftSubqueue[] = []
	private listeners: AircraftQueueListener[] = []

	// The constructor technically would be the "system boot" operation
	constructor(aircraftTypes: AircraftType[]) {
		if (aircraftTypes.length < 1) {
			throw new Error("Aircraft types cannot be empty!")
		}

		aircraftTypes.forEach((aircraftType) => {
			this.aircraftSubqueues.push(new AircraftSubqueue(aircraftType))
		})
	}

	addListener(listener: AircraftQueueListener) {
		this.listeners.push(listener)
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener)
		}
	}

	enqueue(aircraft: Aircraft) {
		const aircraftSubqueue = this.aircraftSubqueues.find((aircraftSubqueue) => {
			return aircraftSubqueue.getAircraftTypeName() == aircraft.getName()
		})

		if (aircraftSubqueue == null) {
			throw new Error("This aircraft type is not supported")
		}

		aircraft.setEnqueuedTime(new Date())

		aircraftSubqueue.enqueue(aircraft)

		this.notifyListenersOfEnqueue()
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

			this.notifyListenersOfDequeue(aircraft)

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

	getListOfAircraftSubqueues() {
		let listOfAircraftSubqueues: Aircraft[][] = []

		for (let i = 0; i < this.aircraftSubqueues.length; i++) {
			listOfAircraftSubqueues.push(this.aircraftSubqueues[i].toList())
		}

		return listOfAircraftSubqueues
	}

	private notifyListenersOfEnqueue() {
		const listOfAircraftSubqueues = this.getListOfAircraftSubqueues()
		this.listeners.forEach((listener) => listener.onAircraftEnqueued(listOfAircraftSubqueues))
	}

	private notifyListenersOfDequeue(dequeuedAircraft: Aircraft) {
		const listOfAircraftSubqueues = this.getListOfAircraftSubqueues()
		this.listeners.forEach((listener) => listener.onAircraftDequeued(listOfAircraftSubqueues, dequeuedAircraft))
	}
}

export const aircraftQueueInstance = new AircraftQueue(aircraftTypes)

export default AircraftQueue
