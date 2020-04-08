import axios from "axios";

// con axios dispatch
export const getCities = () => dispatch => {
	axios.get("/api/cities/all")
		.then(res => {
			// console.log(res.data);
			dispatch ({
				type: "GET_CITIES",
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

