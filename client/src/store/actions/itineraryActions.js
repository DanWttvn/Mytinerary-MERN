import axios from "axios";
import {tokenConfig} from "./authActions"

// --------- GET ALL ITINERARIES --------- //
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
	axios.get(`/itineraries/${city}`) 
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
	axios.get(`/itineraries/itinerary/${itinID}`) 
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
	axios.get(`/itineraries/activities/${itinID}`)
		.then(res => {
			console.log("get activities ACTION", res.data);
			dispatch ({
				type: "GET_ACTIVITIES",
				payload: res.data
		});
	})
}

// --------- GET COMMENTS by ItineraryID --------- //
export const getComments = (itinID)  => dispatch => {
	axios.get(`/itineraries/comments/${itinID}`)
		.then(res => {
			dispatch({
				type: "GET_COMMENTS",
				payload: res.data
			})
			// creo que no puede ser aqui :getuserforcomment
			// console.log("get user for comment ACTION", res.data);
			// dispatch (getUserData(res.userID));
		})
}

// --------- ADD COMMENTS with ItineraryID --------- //
export const addComment = (itinID, content) => (dispatch, getState) => {
	// console.log("ACTION add comment");
	const body = JSON.stringify({ content })
	
	axios.post(`/itineraries/comments/${itinID}`, body, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: "ADD_COMMENT",
				payload: res.data
			})
		})		
}


