const initState = {
	activities: []
}

const activitiesReducer = (state = initState, action) => {
	switch (action.type) {		
		case "GET_ACTIVITIES_BY_ITIN":
			console.log("getting activities BY ITIN", action.payload);
			return {
				...state,
				activities: action.payload
			}
		
		default:
			return state;			
	}
}


export default activitiesReducer;