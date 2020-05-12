import { GET_CITIES } from "../actions/types"

const initState = {
	cities: []
	// citiesDB: [], 
}

const cities = (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_CITIES:
			return {
				...state,
				cities: payload,
				citiesDB: payload
			}

		//?? mejor filtrar en el FE, no??? sin mess con el BE, sino con lo guardado en el store. a lo mejor un city(como itinerary) en el store?
		case "FILTER_CITIES":
			// console.log("filtering ACTION", action.searchTerm);
			let cities = state.citiesDB
			cities = state.citiesDB.filter(city => city.name.toLowerCase().startsWith(action.searchTerm));
			// console.log("Ciudades filtradas: ", cities)
			return {
				...state,
				cities
			}
			
		default:
			return state;
	}
}

export default cities;

