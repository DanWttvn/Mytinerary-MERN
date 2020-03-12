const initState = {
	user: []
}

const loginReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_USER":
			console.log("loggin user REDUCER", action.payload);
			return {
				...state,
				user: action.payload
			};

		default:
			return state;
	}
}

export default loginReducer;