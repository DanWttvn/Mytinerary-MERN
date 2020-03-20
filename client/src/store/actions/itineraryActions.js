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

// --------- GET ITINERARIES BY CITY --------- //
export const getItinerariesByCity = (city) => dispatch => {
	axios.get(`http://localhost:5000/itineraries/${city}`) 
		.then(res => {
			// console.log(res.data);
			dispatch ({
				type: "GET_ITINERARIES",
				payload: res.data
		});
	})
}

// ---------GET ITINERARY for Activities --------- //
export const getItinerary = (itinID) => dispatch => {
	axios.get(`http://localhost:5000/itineraries/itinerary/${itinID}`) 
		.then(res => {
			// console.log(res.data);
			dispatch ({
				type: "GET_ITINERARY",
				payload: res.data
		});
	})
}

// ---------GET ACTIVITIES by ItineraryID --------- //
export const getActivities = (itinID) => dispatch => {
	axios.get(`http://localhost:5000/itineraries/activities/${itinID}`)
		.then(res => {
			// console.log("get activities ACTION", res.data);
			dispatch ({
				type: "GET_ACTIVITIES",
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

