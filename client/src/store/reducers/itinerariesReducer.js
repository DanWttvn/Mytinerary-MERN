const initState = {
	itineraries: [],
	itinerary: {},
	activities: [],
	comments: [],
}

const itinerariesReducer = (state = initState, action) => {
	switch (action.type) {
		case "GET_ITINERARIES": // All, ByCity y ByFavs, AddFavs y get ItinsForActvivities
			// console.log("getting itineraries");
			return {
				...state,
				itineraries: action.payload
			}
		
		case "GET_ITINERARY": // All, ByCity y ByFavs, AddFavs y get ItinsForActvivities
			// console.log("getting itineraries");
			return {
				...state,
				itinerary: action.payload
			}

		case "GET_ACTIVITIES": 
			// console.log("getting activities REDUCER");
			return {
				...state,
				activities: action.payload
			}

		case "GET_COMMENTS": 
			// console.log("getting comments REDUCER");
			return {
				...state,
				comments: action.payload
			}
		
		case "ADD_COMMENT": 
			console.log("adding comments REDUCER");
			return {
				...state,
				comments: [action.payload, ...state.comments]
			}

		default:
			return state;			
	}
}


export default itinerariesReducer;