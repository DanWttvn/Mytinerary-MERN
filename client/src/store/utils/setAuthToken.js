import axios from "axios"

const setAuthToken = token => { // para poner headers en las llamadas axios
	if(token) {
		axios.defaults.headers.common["x-auth-token"] = token
	} else {
		delete axios.defaults.headers.common["x-auth-token"]
	}
}

export default setAuthToken;