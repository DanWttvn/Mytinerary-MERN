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


export const addCity = (newCity) => dispatch => {
	axios.post("http://localhost:5000/cities", newCity) // falta "config" con headersy por eso no funciona (?)
		.then(res => dispatch({
			type: "ADD_CITY",
			payload: res.data // ese data es el item en router cities.js que paso al save() el newItem. recibe la res
		}))	
};


export const filterCities = (searchTerm) => dispatch => {
	dispatch({
		type: "FILTER_CITIES",
		searchTerm: searchTerm
	})
};

