import React, { Component } from "react"

class SignInSM extends Component {

	render() {
		return (
			// <div className="sign-in-SM-box">
			// 	<a className="GFB-btns google-btn" href="/api/auth/google">sign in with Google+</a>
			// 	<a className="GFB-btns fb-btn" href="/api/auth/facebook">sign in with Facebook</a>
			// </div>

			// CHANGE BEFORE DEPLOY 
			<div className="sign-in-SM-box">
				<a className="GFB-btns google-btn" href="http://localhost:5000/api/auth/google">sign in with Google+</a>
				<a className="GFB-btns fb-btn" href="http://localhost:5000/api/auth/facebook">sign in with Facebook</a>
			</div>
		)
	}
}

export default SignInSM;
