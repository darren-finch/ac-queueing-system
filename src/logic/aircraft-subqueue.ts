import { Aircraft } from "./aircraft"
import AircraftType from "./aircraft-type"
import Queue from "./queue"

class AircraftSubqueue {
    aircraftType: AircraftType
    private queue: Queue<Aircraft> = new Queue<Aircraft>()

    constructor(aircraftType: AircraftType) {
        this.aircraftType = aircraftType
    }

    getPriority() {
        return this.aircraftType.getPriority()
    }

    getAircraftTypeName() {
        return this.aircraftType.getName()
    }

    enqueue(aircraft: Aircraft) {
        if (aircraft.getName() != this.aircraftType.getName()) {
            throw new Error("This subqueue's aircraft type does not match this Aircraft")
        }

        this.queue.enqueue(aircraft)
    }

    dequeue() {
        return this.queue.dequeue()
    }

    isEmpty() {
        return this.queue.isEmpty()
    }

    toList() {
        return this.queue.toList()
    }
}

export default AircraftSubqueue