import { configureStore } from "@reduxjs/toolkit"
import aircraftQueueReducer from "../features/aircraft-queue/AircraftQueueSlice"

export default configureStore({
	reducer: {
		aircraftQueue: aircraftQueueReducer,
	},
})
