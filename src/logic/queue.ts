class Queue<T> {
    private head: QueueNode<T> | undefined | null = null

    enqueue(val: T) {
        if (this.head == null) {
            this.head = new QueueNode<T>()
            this.head.setVal(val)
        } else {
            const newNode = new QueueNode<T>()
            newNode.setVal(val)

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
        let list: T[] = []

        let currNode = this.head
        while (currNode != null) {
            list.push(currNode.getVal()!)
            currNode = currNode.getNextNode()
        }

        return list
    }
}

class QueueNode<T> {
    private next: QueueNode<T> | undefined | null = null
    private val: T | undefined | null = null

    setNextNode(nextNode: QueueNode<T>) {
        this.next = nextNode
    }
    getNextNode() {
        return this.next
    }

    setVal(newVal: T) {
        this.val = newVal
    }
    getVal() {
        return this.val
    }
}

export default Queue