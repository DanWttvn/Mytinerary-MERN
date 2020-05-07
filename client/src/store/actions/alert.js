import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from "./types"

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => { //dispatch en el medio por el middleware
	const id = uuidv4();
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id }
	});

	setTimeout(() => {
		dispatch({ 
			type: REMOVE_ALERT, 
			payload: id 
		}); // a los 5s se va la alert
	}, timeout)
}; 