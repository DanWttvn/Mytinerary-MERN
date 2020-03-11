const initState = {
	citiesDB: [], 
	cities: []
}

const citiesReducer = (state = initState, action) => {
	switch (action.type) {
		case "GET_CITIES":
			console.log("fetching Data ACTION");
			return {
				...state,
				citiesDB: action.payload,
				cities: action.payload
			}
		
		case "ADD_CITY":
			console.log("adding city ACTION", action.payload);
			return {
				...state,
				cities: [...state.cities, action.payload]
			};

		case "FILTER_CITIES":
			console.log("filtering ACTION", action.searchTerm);
			let cities = state.citiesDB
			cities = state.citiesDB.filter(city => city.name.toLowerCase().startsWith(action.searchTerm));
			console.log("Ciudades filtradas: ", cities)
			return {
				...state,
				cities
			}
			
		default:
			return state;
	}
	// return state
}

export default citiesReducer;

