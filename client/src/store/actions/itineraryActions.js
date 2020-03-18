import axios from "axios";

// con axios dispatch
export const getAllItineraries = () => dispatch => {
	axios.get("/itineraries/all")
		.then(res => {
			// console.log(res.data);
			dispatch ({
				type: "GET_ITINERARIES",
				payload: res.data
		});
	})
}

export const getItinerariesByCity = (city) => dispatch => {
	axios.get(`http://localhost:5000/itineraries/${city}`) 
		.then(res => {
			// console.log(res.data);
			dispatch ({
				type: "GET_ITINERARIES_BY_CITY",
				payload: res.data
		});
	})
}



// export const addCity = (newCity) => dispatch => {
// 	axios.post("http://localhost:5000/cities", newCity)
// 		.then(res => dispatch({
// 			type: "ADD_CITY",
// 			payload: res.data // ese data es el item en router cities.js que paso al save() el newItem. recibe la res
// 		}))	
// };

