const initState = {
	user: []
}

const usersReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_USER":
			console.log("creating user", action.payload);
			return {
				...state,
				user: action.payload
			};

		default:
			return state;
	}
	// return state
}

export default usersReducer;