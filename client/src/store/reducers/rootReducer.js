//combine all the reducers:
import { combineReducers } from "redux";
import alert from "./alert"
import auth from "./auth"
import itineraries from "./itineraries"
import cities from "./cities";

export default combineReducers({
	alert,
	auth,
	itineraries,
	cities
});