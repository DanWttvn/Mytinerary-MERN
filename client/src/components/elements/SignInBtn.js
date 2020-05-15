import React, { Component } from "react"


class SignInBtn extends Component {
	render() {
		return (
			<div className="btns-box4 center">
				<p>Log in to see this</p>
				<a href="/sign_in"><button className="btn-inside">Sign in</button></a>
			</div>
		)	
	}
}

export default SignInBtn;