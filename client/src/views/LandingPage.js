import React from "react"
import {NavLink} from "react-router-dom"
import LandingBg from "../components/UI_Components/LandingBg"


const LandingPage = () => {
	return (
		<div className="fixedHeight">

			{/* <h1>Mytinerary</h1> */}
			<div className="textOnTop">
				<div className="landingMsg">
					<p className="titlesT hugeLetters">Visit,<br/>Explore,<br/>Enjoy!</p>
					<div className="btnsBox1">
						<button className="transparentBtn"><NavLink to="/sign_in">Sign in</NavLink></button>
						<NavLink className="secondaryBtn" to="/sign_up">Create accout</NavLink>
					</div>
				</div>

				<div className="landingMsg" hidden >
					<p className="titlesT hugeLetters">Welcome, Daniela!</p>
					<div className="btnsBox1">
						<button className="transparentBtn"><NavLink to="/cities">Explore ></NavLink></button>
					</div>
				</div>
			</div>

			<LandingBg/>
		</div>
		
	)
}

export default LandingPage;