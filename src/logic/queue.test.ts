import Queue from "./queue";

let queue = new Queue()

beforeEach(() => {
    queue = new Queue()
})

test("when queue is empty, dequeue throws exception", () => {
    expect(queue.dequeue).toThrow()
})

test('when queue is empty, enqueue adds node and dequeue removes that node, resulting in empty queue again', () => {
    const val = "val"

    queue.enqueue(val)
    const enqueuedVal = queue.dequeue()

    expect(enqueuedVal).toBe(val)
    expect(queue.isEmpty()).toBe(true)
});

test("when queue is empty, enqueue adds two nodes and dequeue removes both nodes in the order they were added, resulting an empty queue again", () => {
    const val1 = "val1"
    const val2 = "val2"

    queue.enqueue(val1)
    queue.enqueue(val2)

    const dequeuedVal1 = queue.dequeue()
    const dequeuedVal2 = queue.dequeue()

    expect(dequeuedVal1).toBe(val1)
    expect(dequeuedVal2).toBe(val2)
    expect(queue.isEmpty()).toBe(true)
})

test("toList returns empty list when queue is empty", () => {
    expect(queue.toList()).toStrictEqual([])
})

test("toList returns list of all values in queue in order they were added", () => {
    const val1 = "val1"
    const val2 = "val2"

    queue.enqueue(val1)
    queue.enqueue(val2)

    expect(queue.toList()).toStrictEqual([val1, val2])
})