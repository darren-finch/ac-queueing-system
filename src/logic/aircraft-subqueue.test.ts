import { Aircraft } from "./aircraft"
import AircraftSubqueue from "./aircraft-subqueue"
import AircraftType from "./aircraft-type"

let aircraftSubqueue = new AircraftSubqueue(new AircraftType(0, "SmallCargoAircraft"))

beforeEach(() => {
    aircraftSubqueue = new AircraftSubqueue(new AircraftType(0, "SmallCargoAircraft"))
})

test("when aircraftSubqueue is empty, dequeue throws exception", () => {
    expect(aircraftSubqueue.dequeue).toThrow()
})

test('when aircraftSubqueue is empty, enqueue adds aircraft and dequeue removes that aircraft, resulting in empty aircraftSubqueue again', () => {
    const aircraft = new Aircraft("SmallCargoAircraft")

    aircraftSubqueue.enqueue(aircraft)
    const enqueuedAircraft = aircraftSubqueue.dequeue()

    expect(enqueuedAircraft).toBe(aircraft)
    expect(aircraftSubqueue.isEmpty()).toBe(true)
})

test("when aircraftSubqueue is empty, enqueue adds two aircraft and dequeue removes both aircraft in the order they were added, resulting an empty aircraftSubqueue again", () => {
    const aircraft1 = new Aircraft("SmallCargoAircraft")
    const aircraft2 = new Aircraft("SmallCargoAircraft")

    aircraftSubqueue.enqueue(aircraft1)
    aircraftSubqueue.enqueue(aircraft2)

    const dequeuedAircraft1 = aircraftSubqueue.dequeue()
    const dequeuedAircraft2 = aircraftSubqueue.dequeue()

    expect(dequeuedAircraft1).toBe(aircraft1)
    expect(dequeuedAircraft2).toBe(aircraft2)
    expect(aircraftSubqueue.isEmpty()).toBe(true)
})

test("toList returns empty list when aircraftSubqueue is empty", () => {
    expect(aircraftSubqueue.toList()).toStrictEqual([])
})

test("toList returns list of all aircraft in aircraftSubqueue in order they were added", () => {
    const aircraft1 = new Aircraft("SmallCargoAircraft")
    const aircraft2 = new Aircraft("SmallCargoAircraft")

    aircraftSubqueue.enqueue(aircraft1)
    aircraftSubqueue.enqueue(aircraft2)

    expect(aircraftSubqueue.toList()).toStrictEqual([aircraft1, aircraft2])
})