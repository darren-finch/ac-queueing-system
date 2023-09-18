import { json } from "stream/consumers"
import { produce } from "immer"
import reducer, { enqueue, dequeue, Aircraft, AircraftQueue } from "./AircraftQueueSlice"

const fakeDate = new Date("2021-01-01")

// This obj prevents "never" types
const emptyAircraftList: Aircraft[] = []
const initialStateBase: AircraftQueue = {
	aircraftSubqueues: [
		{
			aircraft: emptyAircraftList,
			aircraftType: {
				priority: 3,
				name: "LargePassengerAircraft",
			},
		},
		{
			aircraft: emptyAircraftList,
			aircraftType: {
				priority: 2,
				name: "SmallPassengerAircraft",
			},
		},
		{
			aircraft: emptyAircraftList,
			aircraftType: {
				priority: 1,
				name: "LargeCargoAircraft",
			},
		},
		{
			aircraft: emptyAircraftList,
			aircraftType: {
				priority: 0,
				name: "SmallCargoAircraft",
			},
		},
	],
	lastDequeuedAircraft: null,
	isBooted: false,
}

test("when aircraftQueue is empty, enqueue throws error if given aircraft with incorrect type", () => {
	expect(() =>
		reducer(
			initialStateBase,
			enqueue({
				name: "UnsupportedAircraft",
			})
		)
	).toThrow()
})

// There are multiple types of aircraft we could test, but for now I will simply ensure we can enqueue a single aircraft to an empty queue and a single aircraft to a partially filled queue
test("when aircraftQueue is empty, enqueue adds single new aircraft", () => {
	jest.useFakeTimers().setSystemTime(fakeDate)

	const aircraftType = "LargePassengerAircraft"

	const result = reducer(
		initialStateBase,
		enqueue({
			name: aircraftType,
		})
	)

	expect(result).toEqual(
		produce(initialStateBase, (draftState) => {
			draftState.aircraftSubqueues[0].aircraft.push({
				name: aircraftType,
				enqueuedTime: fakeDate,
				dequeuedTime: null,
			})
		})
	)
})

test("when aircraftQueue is partially filled, enqueue adds a single new aircraft", () => {
	const aircraftType = "LargePassengerAircraft"

	const initialState = produce(initialStateBase, (draftState) => {
		draftState.aircraftSubqueues[0].aircraft.push({
			name: aircraftType,
			enqueuedTime: fakeDate,
			dequeuedTime: null,
		})
	})

	const fakeDate2 = new Date("2021-01-02")
	jest.useFakeTimers().setSystemTime(fakeDate2)

	const result = reducer(
		initialState,
		enqueue({
			name: aircraftType,
		})
	)

	expect(result).toEqual(
		produce(initialState, (draftState) => {
			draftState.aircraftSubqueues[0].aircraft.push({
				name: aircraftType,
				enqueuedTime: fakeDate2,
				dequeuedTime: null,
			})
		})
	)
})

test("when aircraftQueue is empty, dequeue returns same state", () => {
	const result = reducer(initialStateBase, dequeue())

	expect(result).toEqual(initialStateBase)
})

// TODO: Finish this test
// test("when aircraftQueue has two aircraft of each type, dequeue successfully removes those aircraft in the correct order, resulting in an empty queue", () => {
// 	let initialState: AircraftQueue = {
// 		aircraftSubqueues: [
// 			{
// 				aircraft: [
// 					{
// 						name: "LargePassengerAircraft",
// 						enqueuedTime: new Date("2021-01-01"),
// 						dequeuedTime: null,
// 					},
// 					{
// 						name: "LargePassengerAircraft",
// 						enqueuedTime: new Date("2021-01-02"),
// 						dequeuedTime: null,
// 					},
// 				],
// 				aircraftType: initialStateBase.aircraftSubqueues[0].aircraftType,
// 			},
// 			{
// 				aircraft: [
// 					{
// 						name: "SmallPassengerAircraft",
// 						enqueuedTime: new Date("2021-01-01"),
// 						dequeuedTime: null,
// 					},
// 					{
// 						name: "SmallPassengerAircraft",
// 						enqueuedTime: new Date("2021-01-02"),
// 						dequeuedTime: null,
// 					},
// 				],
// 				aircraftType: initialStateBase.aircraftSubqueues[1].aircraftType,
// 			},
// 			{
// 				aircraft: [
// 					{
// 						name: "LargeCargoAircraft",
// 						enqueuedTime: new Date("2021-01-01"),
// 						dequeuedTime: null,
// 					},
// 					{
// 						name: "LargeCargoAircraft",
// 						enqueuedTime: new Date("2021-01-02"),
// 						dequeuedTime: null,
// 					},
// 				],
// 				aircraftType: initialStateBase.aircraftSubqueues[2].aircraftType,
// 			},
// 			{
// 				aircraft: [
// 					{
// 						name: "SmallCargoAircraft",
// 						enqueuedTime: new Date("2021-01-01"),
// 						dequeuedTime: null,
// 					},
// 					{
// 						name: "SmallCargoAircraft",
// 						enqueuedTime: new Date("2021-01-02"),
// 						dequeuedTime: null,
// 					},
// 				],
// 				aircraftType: initialStateBase.aircraftSubqueues[3].aircraftType,
// 			},
// 		],
// 		lastDequeuedAircraft: null,
// 		isBooted: false,
// 	}

// 	for (let i = 0; i < 8; i++) {
// 		const tempDate = new Date(`2021-01-0${(i % 2) + 1}`)
// 		jest.useFakeTimers().setSystemTime(tempDate)

// 		const actualResult = reducer(initialState, dequeue())

// 		const expectedResult = produce(initialState, (draftState) => {
// 			const aircraft = draftState.aircraftSubqueues[i % 4].aircraft.shift()!
// 			aircraft.dequeuedTime = tempDate
// 			draftState.lastDequeuedAircraft = aircraft
// 		})

// 		expect(actualResult).toEqual(expectedResult)
// 	}
// })

test("enqueue properly adds enqueue time to aircraft", () => {
	jest.useFakeTimers().setSystemTime(fakeDate)

	const aircraftType = "LargePassengerAircraft"

	const result = reducer(
		initialStateBase,
		enqueue({
			name: aircraftType,
		})
	)

	expect(result).toEqual(
		produce(initialStateBase, (draftState) => {
			draftState.aircraftSubqueues[0].aircraft.push({
				name: aircraftType,
				enqueuedTime: fakeDate,
				dequeuedTime: null,
			})
		})
	)
})

test("dequeue properly adds dequeue time to aircraft", () => {
	const initialState: AircraftQueue = produce(initialStateBase, (draftState) => {
		draftState.aircraftSubqueues[0].aircraft.push({
			name: "LargePassengerAircraft",
			enqueuedTime: fakeDate,
			dequeuedTime: null,
		})
	})

	const fakeDate2 = new Date("2021-01-02")
	jest.useFakeTimers().setSystemTime(fakeDate2)

	const result = reducer(initialState, dequeue())

	expect(result).toEqual(
		produce(initialState, (draftState) => {
			draftState.aircraftSubqueues[0].aircraft.shift()
			draftState.lastDequeuedAircraft = {
				name: "LargePassengerAircraft",
				enqueuedTime: fakeDate,
				dequeuedTime: fakeDate2,
			}
		})
	)
})
