const initState = {
	cities: []
}

const citiesReducer = (state = initState, action) => {
	switch (action.type) {
		case "GET_CITIES":
			console.log("fetching Data");
			return {
				...state,
				cities: action.payload
			}
		
		case "ADD_CITY":
			console.log("adding city", action.newCity);
			break

		case "FILTER_CITIES":
			console.log("filtering");
			let cities = state.cities.filter(city => {
				return city.name.toLowerCase().startsWith(action.searchTerm)
				// çççç
			});
			return {
				...state,
				cities
			}
			
		default:
			return state;
	}
	return state
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
