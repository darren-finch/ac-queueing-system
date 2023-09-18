import { useDispatch, useSelector } from "react-redux"
import { bootSystem } from "./features/aircraft-queue/AircraftQueueSlice"
import AircraftQueueWrapper from "./layouts/AircraftQueue/AircraftQueueWrapper"

const App = () => {
	const aircraftQueue = useSelector((state: any) => state.aircraftQueue)

	return (
		<div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
			<AircraftQueueWrapper aircraftQueue={aircraftQueue} />
		</div>
	)
}

export default App
