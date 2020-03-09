const initState = {
	citiesDB: [], 
	cities: []
}

const citiesReducer = (state = initState, action) => {
	switch (action.type) {
		case "GET_CITIES":
			console.log("fetching Data");
			return {
				...state,
				citiesDB: action.payload,
				cities: action.payload
			}
		
		case "ADD_CITY":
			console.log("adding city", action.payload);
			return {
				...state,
				cities: [...state.cities, action.payload]
			};

		case "FILTER_CITIES":
			console.log("filtering", action.searchTerm);
			let cities = state.citiesDB
			cities = state.citiesDB.filter(city => city.name.toLowerCase().startsWith(action.searchTerm));
			console.log("Ciudades filtradas: ")
			console.log(cities)
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



// filterCities = (searchTerm) => {
// 	let filteredCities = this.state.cities;
// 	filteredCities = filteredCities.filter((city) => city.name.toLowerCase().startsWith(searchTerm));
// 	this.setState({
// 		filteredCities
// 	})

// 	console.log(this.state.filteredCities);
// }
