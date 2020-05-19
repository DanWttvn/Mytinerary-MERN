import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, UPDATE_USER, UPDATE_FAVORITES, ACCOUNT_DELETED, LOGOUT, USER_SM_LOADING } from "../actions/types"

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
		
		case USER_SM_LOADING:
			console.log("action.payload en user_sm_oading:");
			localStorage.setItem("token", payload);
			return {
				...state, 
				loading: true,
				token: payload
			};

		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem("token", payload.token)
			return {
				...state,
				...payload,
				// NO isAuthenticated: true, para que lo ponga al load user
				// NO loading: false para que espere al loaduser
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

		case AUTH_ERROR:
			localStorage.removeItem("token")
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false // lo pone enfalse antes del login
			};

		case ACCOUNT_DELETED:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			localStorage.removeItem("token")
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};

		case LOGOUT:
			localStorage.removeItem("token")
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
			
		default:
			return state;
	}
}

export default auth;
