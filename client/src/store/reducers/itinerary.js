import { GET_ITINERARIES, ITINERARY_ERROR, UPDATE_LIKES, UPDATE_ITINERARY, DELETE_ITINERARY, ADD_ITINERARY, GET_ITINERARY, ADD_COMMENT, REMOVE_COMMENT, CLEAR_ITINERARIES, CLEAR_ITINERARY } from '../actions/types'

const initState = {
	itineraries: [],
	itinerary: null, 
	loading: true,
	error: {}
}

const itinerariesReducer = (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {

		case GET_ITINERARIES:
			return {
				...state,
				itineraries: payload,
				loading: false
			};

		case GET_ITINERARY:
		case UPDATE_ITINERARY:
			return {
				...state,
				itinerary: payload,
				loading: false
			};

		case ADD_ITINERARY:
			return {
				...state,
				itineraries: [payload, ...state.itineraries], // pone el payload primeo para uqe salga en el mismo orden en qeu se guada en la db
				loading: false
			}

		case UPDATE_LIKES:
			return {
				...state,
				itineraries: state.itineraries.map(itinerary => (itinerary._id === payload.id ? { // si el itin es el del id, actualiza los likes
						...itinerary, 
						likes: payload.likes
					}:(
						itinerary // si no, lo devuelve tal cual
					)
				)),
				loading: false
			};

		case DELETE_ITINERARY:
			return {
				...state,
				itineraries: state.itineraries.filter(itinerary => itinerary._id !== payload),
				itinerary: null,
				loading: false
			};

		case ADD_COMMENT:
			return {
				...state,
				itinerary: {
					...state.itinerary, 
					comments: payload,
					loading: false
				}
			}

		case REMOVE_COMMENT:
			return {
				...state,
				itinerary: {
					...state.itinerary,
					comments: state.itinerary.comments.filter(comment => comment._id !== payload),
					loading: false
				}
			}

		case ITINERARY_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};

		//* lo he puesto yo
		case CLEAR_ITINERARIES:
			return {
				...state,
				itineraries: null,
			};

		case CLEAR_ITINERARY:
			return {
				...state,
				itinerary: null,
			};
		


		default:
			return state;			
	}
}


export default itinerariesReducer;