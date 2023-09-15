class AircraftType {
    private priority: number
    private name: string

    constructor(priority: number, name: string) {
        this.priority = priority
        this.name = name
    }

    getPriority() {
        return this.priority
    }

    getName() {
        return this.name
    }
}

export default AircraftType