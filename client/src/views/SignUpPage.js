import React from "react"
import LandingBg from "../components/LandingBg"


const SignUpPage = () => {
	return (
		<div id="signUp" className="fixedHeight">
			{/* <h1>SIGN UP</h1> */}

			<form action="" method=""  className="formBox">

				<div  className="formSection">
					<input type="text" name="user_name" required/>
					<label htmlFor="user_name"  className="labelBox">
						<span  className="labelContent">User Name</span>
					</label>
				</div>

				<div  className="formSection">
					<input type="text" name="password" required/>
					<label htmlFor="password"  className="labelBox">
						<span  className="labelContent">Password</span>
					</label>
				</div>

				<div className="formSection">
					<input type="text" name="contact_email" required />
					<label htmlFor="contact_email" className="labelBox">
						<span className="labelContent">Contact Email</span>
					</label>
				</div>


				<input className="sendButton" type="submit" name="submit" value="Send"></input>


			</form>
			
			<div className="mascaraExtra"></div>

			<LandingBg/>

		</div>
	)
}

export default SignUpPage;