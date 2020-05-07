import axios from "axios";
import { GET_CITIES } from "./types"

// con axios dispatch
export const getCities = () => dispatch => {
	axios.get("/api/cities")
		.then(res => {
			dispatch ({
				type: GET_CITIES,
				payload: res.data
		});
	})
}


export const filterCities = (searchTerm) => dispatch => {
	dispatch({
		type: "FILTER_CITIES",
		searchTerm: searchTerm
	})
};

