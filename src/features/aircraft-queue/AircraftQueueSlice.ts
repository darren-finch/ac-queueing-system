import { createSlice } from "@reduxjs/toolkit"

export interface Aircraft {
	name: string
	enqueuedTime: Date | null | undefined
	dequeuedTime: Date | null | undefined
}

export interface AircraftType {
	priority: number
	name: string
}

export interface AircraftSubqueue {
	aircraft: Aircraft[]
	aircraftType: AircraftType
}

export interface AircraftQueue {
	aircraftSubqueues: AircraftSubqueue[]
	lastDequeuedAircraft: Aircraft | null
	isBooted: boolean
}

export const STARTING_AIRCRAFT_TYPES = [
	{ priority: 3, name: "LargePassengerAircraft" },
	{ priority: 2, name: "SmallPassengerAircraft" },
	{ priority: 1, name: "LargeCargoAircraft" },
	{ priority: 0, name: "SmallCargoAircraft" },
]

const initialState: AircraftQueue = {
	aircraftSubqueues: STARTING_AIRCRAFT_TYPES.map((aircraftType) => {
		const aircraftSubqueue: AircraftSubqueue = {
			aircraft: [],
			aircraftType: aircraftType,
		}

		return aircraftSubqueue
	}),
	lastDequeuedAircraft: null,
	isBooted: false,
}

export const aircraftQueueSlice = createSlice({
	name: "aircraft-queue",
	initialState: initialState,
	reducers: {
		enqueue: (state, action) => {
			if (!state.isBooted) {
				throw new Error("System not initialized")
			}

			const aircraftSubqueue = state.aircraftSubqueues.find((aircraftSubqueue) => {
				return aircraftSubqueue.aircraftType.name === action.payload.name
			})

			if (aircraftSubqueue == null) {
				throw new Error("This aircraft type is not supported")
			}

			const newAircraft = {
				name: action.payload.name,
				enqueuedTime: new Date(),
				dequeuedTime: null,
			}

			aircraftSubqueue.aircraft.push(newAircraft)
		},
		dequeue: (state) => {
			if (!state.isBooted) {
				throw new Error("System not initialized")
			}

			if (isEmpty(state)) {
				return
			}

			let priorityOfSubsequenceInPrevLoop: number | null = null

			while (true) {
				let highestPrioritySubqueue = getNextHighestPrioritySubqueue(
					state.aircraftSubqueues,
					priorityOfSubsequenceInPrevLoop
				)

				if (highestPrioritySubqueue.aircraft.length === 0) {
					priorityOfSubsequenceInPrevLoop = highestPrioritySubqueue.aircraftType.priority
					continue
				}

				state.lastDequeuedAircraft = highestPrioritySubqueue.aircraft.shift()!
				state.lastDequeuedAircraft.dequeuedTime = new Date()
				break
			}
		},
		bootSystem: (state) => {
			state.isBooted = true
		},
	},
})

export const isEmpty = (aircraftQueue: AircraftQueue) => {
	const aircraftSubqueues = aircraftQueue.aircraftSubqueues

	let isEmpty = true

	for (let i = 0; i < aircraftSubqueues.length; i++) {
		isEmpty = isEmpty && aircraftSubqueues[i].aircraft.length === 0
	}

	return isEmpty
}

const getNextHighestPrioritySubqueue = (
	aircraftSubqueues: AircraftSubqueue[],
	priorityOfSubsequenceInPrevLoop: number | null
) => {
	let highestPrioritySubqueue: AircraftSubqueue | null = null
	for (let i = 0; i < aircraftSubqueues.length; i++) {
		const currPriority = aircraftSubqueues[i].aircraftType.priority

		if (priorityOfSubsequenceInPrevLoop != null && currPriority >= priorityOfSubsequenceInPrevLoop) {
			continue
		}

		if (highestPrioritySubqueue == null) {
			highestPrioritySubqueue = aircraftSubqueues[i]
			continue
		}

		if (currPriority > highestPrioritySubqueue.aircraftType.priority) {
			highestPrioritySubqueue = aircraftSubqueues[i]
		}
	}
	return highestPrioritySubqueue!
}

export const { enqueue, dequeue, bootSystem } = aircraftQueueSlice.actions
export default aircraftQueueSlice.reducer
