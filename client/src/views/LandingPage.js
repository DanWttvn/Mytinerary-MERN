import React from "react"
import {NavLink} from "react-router-dom"
import LandingBg from "../components/UI_Components/LandingBg"


const LandingPage = () => {
	return (
		<div className="fixedHeight">

			{/* <h1>Mytinerary</h1> */}
			<div className="textOnTop">
				<div className="signInMessage">
					<h4 className="welcomeMessage">Visit<br/>Explore,<br/>Enjoy!</h4>
					<div className="signingBox">
						<button className="signInBtn"><NavLink to="/sign_in">Sign in</NavLink></button>
						<NavLink className="createAccountBtn" to="/sign_up">Create accout</NavLink>
					</div>
				</div>

				<div className="signedInMessage" hidden>
					<h4 className="welcomeMessage">Welcome, Daniela!</h4>
					{/* cambiar a 75px */}
					<button className="signingBox signInBtn"><NavLink to="/cities">Explore ></NavLink></button>
				</div>
			</div>

			<LandingBg/>
		</div>
		
	)
}

export default LandingPage;