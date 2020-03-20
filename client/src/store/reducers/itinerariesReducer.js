const initState = {
	itineraries: [],
	itinerary: {}
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

		default:
			return state;			
	}
}


export default itinerariesReducer;