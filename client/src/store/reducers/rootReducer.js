//combine all the reducers:
import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer"
import activitiesReducer from "./activitiesReducer"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"

const rootReducer = combineReducers ({
	cities: citiesReducer,
	itineraries: itinerariesReducer,
	activities: activitiesReducer,
	auth: authReducer,
	error: errorReducer
}); // makes 1 object out of all the reducers' functions. in this case, I rename the citiesReducer as cities. Reducers have to: - return state as default
export default rootReducer;