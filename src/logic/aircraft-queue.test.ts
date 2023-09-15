import { Aircraft } from "./aircraft"
import AircraftQueue from "./aircraft-queue"
import AircraftType from "./aircraft-type"

let aircraftTypes = [
	new AircraftType(3, "LargePassengerAircraft"),
	new AircraftType(2, "SmallPassengerAircraft"),
	new AircraftType(1, "LargeCargoAircraft"),
	new AircraftType(0, "SmallCargoAircraft"),
]

let aircraftQueue = new AircraftQueue(aircraftTypes)

beforeEach(() => {
	aircraftQueue = new AircraftQueue(aircraftTypes)
})

test("when no aircraft types are given, constructor throws error", () => {
	expect(() => new AircraftQueue([])).toThrow()
})

test("when given an aircraft with an unsupported type, enqueue throws error", () => {
	const aircraft = new Aircraft("UnsupportedAircraft")

	expect(() => aircraftQueue.enqueue(aircraft)).toThrow()
})

test("when aircraftQueue contains aircraft, isEmpty returns false", () => {
	const aircraft = new Aircraft("SmallCargoAircraft")

	aircraftQueue.enqueue(aircraft)

	expect(aircraftQueue.isEmpty()).toBe(false)
})

test("when aircraftQueue is empty, isEmpty returns true", () => {
	expect(aircraftQueue.isEmpty()).toBe(true)
})

test("when aircraftQueue is empty, enqueue adds single new aircraft and dequeue removes that aircraft, resulting in an empty queue", () => {
	const newAircraft = new Aircraft("SmallCargoAircraft")

	aircraftQueue.enqueue(newAircraft)
	const dequeuedAircraft = aircraftQueue.dequeue()

	expect(dequeuedAircraft).toBe(newAircraft)
	expect(aircraftQueue.isEmpty()).toBe(true)
})

test("when aircraftQueue is empty, enqueue successfully adds several aircraft and dequeue removes those aircraft in the correct order, resulting in an empty queue", () => {
	const largeCargoAircraft1 = new Aircraft("LargeCargoAircraft")
	const largeCargoAircraft2 = new Aircraft("LargeCargoAircraft")
	const smallCargoAircraft1 = new Aircraft("SmallCargoAircraft")
	const smallCargoAircraft2 = new Aircraft("SmallCargoAircraft")
	const largePassengerAircraft1 = new Aircraft("LargePassengerAircraft")
	const largePassengerAircraft2 = new Aircraft("LargePassengerAircraft")
	const smallPassengerAircraft1 = new Aircraft("SmallPassengerAircraft")

	const newAircraftList = [
		smallCargoAircraft1,
		largePassengerAircraft1,
		smallPassengerAircraft1,
		largePassengerAircraft2,
		smallCargoAircraft2,
		largeCargoAircraft1,
		largeCargoAircraft2,
	]

	newAircraftList.forEach((newAircraft) => {
		aircraftQueue.enqueue(newAircraft)
	})

	expect(aircraftQueue.dequeue()).toBe(largePassengerAircraft1)
	expect(aircraftQueue.dequeue()).toBe(largePassengerAircraft2)
	expect(aircraftQueue.dequeue()).toBe(smallPassengerAircraft1)
	expect(aircraftQueue.dequeue()).toBe(largeCargoAircraft1)
	expect(aircraftQueue.dequeue()).toBe(largeCargoAircraft2)
	expect(aircraftQueue.dequeue()).toBe(smallCargoAircraft1)
	expect(aircraftQueue.dequeue()).toBe(smallCargoAircraft2)

	expect(aircraftQueue.isEmpty()).toBe(true)
})

test("enqueue properly adds enqueue time to aircraft", () => {
	const fakeDate = new Date("2020-01-01")
	jest.useFakeTimers().setSystemTime(fakeDate)

	const aircraft = new Aircraft("SmallCargoAircraft")

	aircraftQueue.enqueue(aircraft)

	expect(aircraft.getEnqueuedTime()).toStrictEqual(fakeDate)
})

test("dequeue properly adds dequeue time to aircraft", () => {
	const fakeDate = new Date("2020-01-01")
	jest.useFakeTimers().setSystemTime(fakeDate)

	aircraftQueue.enqueue(new Aircraft("SmallCargoAircraft"))
	const dequeuedAircraft = aircraftQueue.dequeue()

	expect(dequeuedAircraft!.getDequeuedTime()).toStrictEqual(fakeDate)
})

test("when aircraftQueue is empty, dequeue throws exception", () => {
	expect(aircraftQueue.dequeue).toThrow()
})
