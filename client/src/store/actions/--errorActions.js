import { GET_ERRORS, CLEAR_ERRORS } from "./types"

// Return errors
export const returnErrors = (msg, status, id = null) => { // el id lo pongo cuando lo dispatch (LOGIN_FAIL, REGISTERFAIL,....)
	return {
		type: GET_ERRORS,
		payload: {msg, status, id}
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};