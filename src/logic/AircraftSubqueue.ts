import { Aircraft } from "./Aircraft"
import AircraftType from "./AircraftType"

class AircraftSubqueue {
	private aircraftType: AircraftType
	private head: AircraftSubqueueNode | undefined | null = null

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

		if (this.head == null) {
			this.head = new AircraftSubqueueNode()
			this.head.setVal(aircraft)
		} else {
			const newNode = new AircraftSubqueueNode()
			newNode.setVal(aircraft)

			this.head.setNextNode(newNode)
		}
	}

	dequeue() {
		if (this.head == null) {
			throw new Error("Queue is empty")
		}

		const oldHead = this.head

		if (this.head.getNextNode() != null) {
			this.head = this.head.getNextNode()
		} else {
			this.head = null
		}

		return oldHead.getVal()
	}

	isEmpty() {
		return this.head == null
	}

	toList() {
		let list: Aircraft[] = []

		let currNode = this.head
		while (currNode != null) {
			list.push(currNode.getVal()!)
			currNode = currNode.getNextNode()
		}

		return list
	}
}

class AircraftSubqueueNode {
	private next: AircraftSubqueueNode | undefined | null = null
	private val: Aircraft | undefined | null = null

	setNextNode(nextNode: AircraftSubqueueNode) {
		this.next = nextNode
	}
	getNextNode() {
		return this.next
	}

	setVal(newVal: Aircraft) {
		this.val = newVal
	}
	getVal() {
		return this.val
	}
}

export default AircraftSubqueue
