import axios from "axios";
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./types"
import { returnErrors } from "./errorActions"

// --- TRAVERSY

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
	// user loading
	dispatch({
		type: USER_LOADING //is loadign to true
	});

	axios.get("/auth/user", tokenConfig(getState)) // la comrpobacion del token que la he puesto a parte porqeu se va arepetir mucho
		.then(res => dispatch({
			type: USER_LOADED, // isAuthenticated true
			payload: res.data
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status)); // un obj como el de abajo pero conmas params. pasa lo de erroActions
			dispatch({
				type: AUTH_ERROR // everyting erasesd
			})
		})
}

// Register user
export const register = ({ username, email, password }) => dispatch => {
	// Headers
	const config = {
		headers: {
			"Content-type" : "application/json"
		}
	}
	// Request body
	const body = JSON.stringify({ username, email, password });

	axios.post("/user/sign_up", body, config)
		.then(res => dispatch({
			type: REGISTER_SUCCESS, // isAuth = true
			payload: res.data // usr data + token
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")); // un obj como el de abajo pero conmas params. pasa lo de erroActions
			dispatch({
				type: REGISTER_FAIL
			})
		})
}

// Setup config-headers and token. se va a uar cada vez que uqiera comprobar el token
export const tokenConfig = getState => {
	// Get token from localstorage
	const token = getState().auth.token //authReducer -> localstorage

	// Headers. se añade al header ?
	const config = {
		headers: {
			"Content-type" : "application/json"
		}
	}

	// If token, add to headers
	if (token) {
		config.headers["x-auth-token"] = token;
	}

	return config
}


//  Log out User
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS // cleans tken and isAut = false
	}
} 





// --- ANTES MIO 

// export const loginUser = (newUser) => dispatch => {
// 	axios.post("/auth/login", newUser) //5000
// 		.then(res => {
// 			dispatch({
// 				type: "LOGIN_USER",
// 				payload: res.data
// 			});
// 	})
// };

// export const logoutUser = (currentUser) => dispatch => {
// 	axios.post("/auth/logout", currentUser)
// 		.then(res => {
// 			dispatch({
// 				type: "LOGOUT_USER",
// 				payload: res.data
// 			});
// 	})
// };
