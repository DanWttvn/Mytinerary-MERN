const initState = {
	itineraries: []
}

const itinerariesReducer = (state = initState, action) => {
	switch (action.type) {
		case "GET_ITINERARIES": // All, ByCity y ByFavs y AddFavs?
			console.log("getting itineraries");
			return {
				...state,
				itineraries: action.payload
			}

		case "GET_ITINERARIES_BY_CITY": // reducir a solo 1 ççç
			console.log("getting itineraries BY CITY", action.payload);
			return {
				...state,
				itineraries: action.payload
			}

		default:
			return state;			
	}
}


export default itinerariesReducer;