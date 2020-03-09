import React from "react"
import LandingBg from "../components/LandingBg"
import NewAccount from "../components/NewAccount"


const SignUpPage = () => {
	return (
		<div id="signUp" className="fixedHeight">
			
			<NewAccount/>
			
			<div className="mascaraExtra"></div>

			<LandingBg/>

		</div>
	)
}

export default SignUpPage;