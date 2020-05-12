import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, UPDATE_USER, UPDATE_FAVORITES, ACCOUNT_DELETED, LOGOUT } from "../actions/types"

const initState = {
	token: localStorage.getItem("token"), 
	isAuthenticated: null,
	loading: true,
	user: null
}

const auth = (state = initState, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED: 
		case UPDATE_USER:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			}
		
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem("token", payload.token)
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			}

		case UPDATE_FAVORITES:
			return {
				...state,
				user: {
					...state.user,
					favorites: payload
				},
				loading: false
			}

		case ACCOUNT_DELETED:
		case LOGOUT:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case REGISTER_FAIL:
			localStorage.removeItem("token")
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false
			};

		
		//??
		// case "UPDATE_FAVORITES": 
		// 	// console.log("modifyinf favs", payload);
		// 	return {
		// 		...state,
		// 		user: payload
		// 	}
			
		default:
			return state;
	}
}

export default auth;
