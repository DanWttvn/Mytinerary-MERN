import axios from "axios";

export const loginUser = (newUser) => dispatch => {
	axios.post("/auth/login", newUser) //5000
		.then(res => {
			dispatch({
				type: "LOGIN_USER",
				payload: res.data
			});
	})
};