import axios from "axios";
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "./types"
import { returnErrors } from "./errorActions"

// --- TRAVERSY

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
	console.log("loadUser de authActions");
	
	// user loading
	dispatch({
		type: USER_LOADING //is loading to true
	});

	axios.get("http://localhost:5000/auth/user", tokenConfig(getState)) // la comrpobacion del token que la he puesto a parte porqeu se va arepetir mucho
		.then(res => dispatch({
			type: USER_LOADED, // isAuthenticated true
			payload: res.data
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status)); // un obj como el de abajo pero conmas params. pasa lo de erroActions
			dispatch({
				type: AUTH_ERROR // everything erasesd
			})
		})
}

// Setup config-headers and token. se va a uar cada vez que quiera comprobar el token
export const tokenConfig = getState => {
	// Get token from localstorage
	const token = getState().auth.token //authReducer -> localstorage
	const config = {
		headers: {
			"Content-type" : "application/json"
		}
	}
	// If token, add to headers
	if (token) {
		config.headers["Authorization"] = "bearer " + token;
	}
	return config
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

//  Log in User
export const login = ({ email, password }) => dispatch => {
	// Headers
	const config = {
		headers: {
			"Content-type" : "application/json"
		}
	}
	// Request body
	const body = JSON.stringify({ email, password });

	axios.post("/user/login", body, config)
		.then(res => {
			dispatch({
				type: LOGIN_SUCCESS, // isAuth = true
				payload: res.data // usr data + token en localstorage
			})
			// res.redirect("/cities")
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")); // un obj como el de abajo pero conmas params. pasa lo de erroActions
			dispatch({
				type: LOGIN_FAIL
			})
		})
} 

//  Log out User
export const logout = () => {
	// por que no hay dispatch? por que no conecta con el post?
	return {
		type: LOGOUT_SUCCESS // cleans tken and isAut = false
	}
} 


// -- GET FAVS
export const getItinerariesByFavs = ()  => (dispatch, getState) => {
	axios.get("http://localhost:5000/user/favorites", tokenConfig(getState)) 
		.then(res => {
			// console.log("favorites by user", res.data);
			dispatch ({
				// type: "GET_ITINERARIES_BY_FAVS",
				type: "GET_ITINERARIES", // prueba si nuevo reducer
				payload: res.data
		});
	})
}

// --- ANTES MIO 


// export const logoutUser = (currentUser) => dispatch => {
// 	axios.post("/auth/logout", currentUser)
// 		.then(res => {
// 			dispatch({
// 				type: "LOGOUT_USER",
// 				payload: res.data
// 			});
// 	})
// };
