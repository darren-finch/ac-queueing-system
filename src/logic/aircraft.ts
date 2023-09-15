class Aircraft {
    private name: string
    private enqueuedTime: Date | null = null
    private dequeuedTime: Date | null = null

    constructor(name: string) {
        this.name = name
    }

    getName() {
        return this.name
    }

    getEnqueuedTime() {
        return this.enqueuedTime
    }

    getDequeuedTime() {
        return this.dequeuedTime
    }

    setEnqueuedTime(enqueuedTime: Date) {
        this.enqueuedTime = enqueuedTime
    }

    setDequeuedTime(dequeuedTime: Date) {
        this.dequeuedTime = dequeuedTime
    }
}

export { Aircraft }