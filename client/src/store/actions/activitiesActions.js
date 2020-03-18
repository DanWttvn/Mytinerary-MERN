import axios from "axios";

export const getActivitiesByItinerary = (city) => dispatch => {
	axios.get(`http://localhost:5000/activities/${city}`) // çççç !! aqui (con/Amsteradm funciona)
		.then(res => {
			console.log(res.data);
			dispatch ({
				type: "GET_ACTIVITIES_BY_ITIN",
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

