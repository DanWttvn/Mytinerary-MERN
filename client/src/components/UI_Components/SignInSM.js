import React, { Component } from "react"

class SignInSM extends Component {

	render() {
		return (
			<div className="signInSMBox">
				<a className="GFB-btns google-btn" href="http://localhost:5000/auth/google">sign in with Google+</a>
				<a className="GFB-btns fb-btn" href="http://localhost:5000/auth/facebook">sign in with Facebook</a>

				{/* <a className="GFB-btns google-btn" href="https://mytinerary-server-d.herokuapp.com/auth/google">sign in with Google+</a>
				<a className="GFB-btns fb-btn" href="https://mytinerary-server-d.herokuapp.com/auth/facebook">sign in with Facebook</a> */}
			</div>
		)
	}
}

export default SignInSM;
