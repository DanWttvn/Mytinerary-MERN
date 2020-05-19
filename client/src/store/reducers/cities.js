import { GET_CITIES, FILTER_CITIES } from "../actions/types"

const initState = {
	cities: [],
	loading: true,
	filteredCities: [], 
}

const cities = (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_CITIES:
			return {
				...state,
				cities: payload,
				filteredCities: payload,
				loading: false
			}

		//?? mejor filtrar en el FE, no??? sin mess con el BE, sino con lo guardado en el store. a lo mejor un city(como itinerary) en el store?
		case FILTER_CITIES:
			let filteredCities = state.cities.filter(city => city.name.toLowerCase().startsWith(payload));
			return {
				...state,
				filteredCities
			}
			
		default:
			return state;
	}
}

export default cities;

