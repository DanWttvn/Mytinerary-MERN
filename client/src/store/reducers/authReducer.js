import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types"

const initState = {
	token: localStorage.getItem("token"), //cuando lo ha pasado?
	isAuthenticated: null,
	isLoading: false,
	user: null
}

const usersReducer = (state = initState, action) => {
	switch (action.type) {
		// -- ANTES MIO
		// case "LOGIN_USER":
		// 	console.log("loggin user REDUCER", action.payload);
		// 	return {
		// 		...state,
		// 		user: action.payload.user,
		// 		token: action.payload.token
		// 	};

		// case "LOGOUT_USER":
		// 	console.log("logging out user", action.payload);
		// 	return {
		// 		user: [],
		// 		token: ""
		// 	};

		// -- TRAVERSY
		case USER_LOADING:
			return {
				...state, 
				isLoading: true
			};

		case USER_LOADED: //runs in every request
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			}

		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS: //lo mmismo en los dos casos
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload, //incluye user y token
				isAuthenticated: true,
				isLoading: false,
			}
		
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			}


		default:
			return state;
	}
	// return state
}

export default usersReducer;
