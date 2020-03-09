//combine all the reducers:
import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer"

const rootReducer = combineReducers ({
	cities: citiesReducer,
	itineraries: itinerariesReducer
	// activities: activiesRecuer
	//otros red

}); // makes 1 object out of all the reducers' functions. in this case, I rename the citiesReducer as cities. Reducers have to: - return state as default
export default rootReducer;