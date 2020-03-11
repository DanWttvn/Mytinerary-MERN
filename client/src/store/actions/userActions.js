import axios from "axios";

export const createUser = (newUser) => dispatch => {
	axios.post("/user/sign_up", newUser)
		.then(res => {
			dispatch({
				type: "CREATE_USER",
				payload: res.data
			});
	})
};