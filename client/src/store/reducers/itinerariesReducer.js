const initState = {
	itineraries: []
}

const itinerariesReducer = (state = initState, action) => {
	switch (action.type) {
		case "GET_ITINERARIES":
			console.log("getting itineraries");
			return {
				...state,
				itineraries: action.payload
			}
		
		default:
			return state;			
	}
}

export default itinerariesReducer;