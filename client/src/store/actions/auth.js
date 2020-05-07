import axios from "axios";
import { setAlert } from "./alert"
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, UPDATE_USER, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, UPDATE_FAVORITES } from "./types"
import setAuthToken from "../utils/setAuthToken"


// Check token and load user
export const loadUser = () => dispatch => {
	// Set the token in the call header
	if(localStorage.token) {
		setAuthToken(localStorage.token)
	}

	// Get the user from the token
	axios.get("/api/auth/user")
		.then(res => {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: AUTH_ERROR
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

	axios.post("/api/users", body, config)
		.then(res => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data // token
			})
			dispatch(loadUser()) // loads user right after registering
		})
		.catch(err => {
			const errors = err.response.data.errors; //errors array
			if(errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
			}
			dispatch({
				type: REGISTER_FAIL
			})
		})
}


//  Log in User
export const login = ( email, password ) => dispatch => {
	const config = {
		headers: {
			"Content-type" : "application/json"
		}
	}
	const body = JSON.stringify({ email, password });

	axios.post("/api/auth/login", body, config)
		.then(res => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data // token
			})
			dispatch(loadUser())
		})
		.catch(err => {
			const errors = err.response.data.errors;
			if(errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
			}
			dispatch({
				type: LOGIN_FAIL
			})
		})
} 


// Update avatar
export const updateAvatar = formData => dispatch => {
	const config = {
		headers: {
			"Content-type" : "multipart/form-data"
		}
	}

	axios.put("api/users/avatar", formData, config)
		.then(res => {
			dispatch({
				type: UPDATE_USER,
				payload: res.data
			})
			.then(() => {
				window.location.reload(true)
			})
		})
		.catch(err => {
			dispatch(setAlert(err.msg, "danger"))
		})
}


// Update avatar
export const updateFavorites = itin_id => dispatch => {
	axios.put(`/api/users/favorites/${itin_id}`)
		.then(res => {
			dispatch({
				type: UPDATE_FAVORITES,
				payload: res.data //user.favorites
			})
		})
		.catch(err => {
			dispatch(setAlert(err.msg, "danger"))
		})
}


//  Logout and Clear Profile
export const logout = () => {
	dispatch({ type: LOGOUT })
} 


// Delete account and Profile
export const deleteAccount = () => dispatch => {
	// Confirmation
	if(window.confirm("Are you sure? This can NOT be undone!")) {

		axios.delete(`/api/users`)
			.then(() => {
				dispatch({ type: ACCOUNT_DELETED })
				dispatch(setAlert("Your account has been permanently deleted"))
			})
			.catch(err => {
				dispatch({
					//! el que? otro type como ACCOUNT_ERROR ?
					// type: PROFILE_ERROR,
					// payload: { msg: err.response.statusText, status: err.response.status }
				})
			})
	
		}
	}
}

//??
// send token when comes in the URL from Social Media
// export const sendTokenSM = (tokenURL) => (dispatch, getState) => {
// 	console.log("sendTokenSM de authActions");
// 	console.log(tokenURL);
	
// 	// user loading
// 	dispatch({
// 		type: "USER_SM_LOADING", //is loading to true
// 		payload: tokenURL
// 	});
// }


// ??
// -- GET FAVS
// export const getItinerariesByFavs = ()  => (dispatch, getState) => {
// 	axios.get("/api/user/favorites", tokenConfig(getState)) 
// 		.then(res => {
// 			// console.log("favorites by user", res.data);
// 			dispatch ({
// 				type: "GET_ITINERARIES", /// me vale el mismo reducer
// 				payload: res.data
// 		});
// 	})
// }


// ??
// export const addToFavorites = (id) => (dispatch, getState) => {
// 	// console.log("id:", id);
// 	const body = JSON.stringify({ id }); // lo que .stringify es un obj. como el mio no lo es, le pongo {}
// 	// console.log("body:", body);
	
// 	axios.put("/api/user/favorites", body, tokenConfig(getState))

// 		.then(res => {
// 			// me llega en res todo el user modificado con nuevos FAVS
// 			// console.log("lo que me llega del BackEndPUT:", res.data);
// 			dispatch({
// 				type: "UPDATE_FAVORITES",
// 				payload: res.data
// 			})
// 			// console.log("despues de dispatch");
// 		})
// }







