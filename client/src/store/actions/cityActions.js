import axios from "axios";

// con axios dispatch
export const getCities = () => dispatch => {
	axios.get("/cities/all")
		.then(res => {
			console.log(res.data);
			dispatch ({
				type: "GET_CITIES",
				payload: res.data
		});
	})
}


export const addCity = (newCity) => {
	//with thunk I return function, not obj
	return (dispatch, getState) => {
		// FALTA make async call to database to add it to the db
		dispatch({
			type: "ADD_CITY",
			newCity
		})
	}
};


export const filterCities = (searchTerm) => dispatch => {
	dispatch({
		type: "FILTER_CITIES",
		searchTerm: searchTerm
	})
};

