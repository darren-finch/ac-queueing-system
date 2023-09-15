import { Aircraft } from "../logic/aircraft";
import AircraftQueue from "../logic/aircraft-queue";
import { aircraftTypes } from "./AircraftTypes";

export interface AircraftQueueRepositoryListener {
    onAircraftEnqueued: (listOfListsOfAircraft: Aircraft[][]) => void;
    onAircraftDequeued: (listOfListsOfAircraft: Aircraft[][], dequeuedAircraft: Aircraft) => void;
}

export class AircraftQueueRepository {
    private listeners: AircraftQueueRepositoryListener[] = [];
    private aircraftQueue: AircraftQueue = new AircraftQueue(aircraftTypes);

    addListener(listener: AircraftQueueRepositoryListener) {
        this.listeners.push(listener);
        return () => { this.listeners = this.listeners.filter(l => l !== listener) };
    }

    enqueue(aircraftName: string) {
        this.aircraftQueue.enqueue(new Aircraft(aircraftName));
        
        this.notifyListenersOfEnqueue();
    }

    dequeue() {
        const dequeuedAircraft = this.aircraftQueue.dequeue();

        this.notifyListenersOfDequeue(dequeuedAircraft);
    }

    isEmpty() {
        return this.aircraftQueue.isEmpty();
    }

    private notifyListenersOfEnqueue() {
        const listOfListsOfAircraft = this.aircraftQueue.getListOfListsOfAircraft();
        this.listeners.forEach(listener => listener.onAircraftEnqueued(listOfListsOfAircraft));
    }

    private notifyListenersOfDequeue(dequeuedAircraft: Aircraft) {
        const listOfListsOfAircraft = this.aircraftQueue.getListOfListsOfAircraft();
        this.listeners.forEach(listener => listener.onAircraftDequeued(listOfListsOfAircraft, dequeuedAircraft));
    }
}

export const aircraftQueueRepository = new AircraftQueueRepository();