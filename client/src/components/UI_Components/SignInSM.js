import React, { Component } from "react"

class SignInSM extends Component {

	render() {
		return (
			<div className="signInSMBox">
				<a className="GFB-btns google-btn" href="/api/auth/google">sign in with Google+</a>
				<a className="GFB-btns fb-btn" href="/api/auth/facebook">sign in with Facebook</a>

				{/* <a className="GFB-btns google-btn" href="/api/auth/google">sign in with Google+</a>
				<a className="GFB-btns fb-btn" href="/api/auth/facebook">sign in with Facebook</a> */}
			</div>
		)
	}
}

export default SignInSM;
