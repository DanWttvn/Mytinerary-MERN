import React from "react"
import {NavLink} from "react-router-dom"
import LandingBg from "../components/LandingBg"


const LandingPage = () => {
	return (
		<div className="fixedHeight">

			{/* <h1>Mytinerary</h1> */}
			<div className="textOnTop">
				<h4 className="welcomeMessage">Visit<br/>Explore,<br/>Enjoy!</h4>
				<h4 className="welcomeMessage" hidden>Welcome, Daniela!</h4>
				<div className="signingBox">
					<button className="signInBtn"><NavLink to="/sign_in">Sign in</NavLink></button>
					<NavLink className="createAccountBtn" to="/sign_up">Create accout</NavLink>
				</div>
			</div>

			<LandingBg/>
		</div>
		
	)
}

export default LandingPage;