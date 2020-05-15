import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { register } from "../../store/actions/auth"
import LandingBg from "../elements/LandingBg"
// import SignInSM from "../elements/SignInSM"
import { setAlert } from '../../store/actions/alert'

class SignUpP extends Component {
	state = {
		username: "",
		password: "",
		password2: "",
		email: ""
	};

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = async (e) => {
		e.preventDefault();
		const { username, password, password2, email } = this.state

		if(password !== password2) {
			this.props.setAlert("Passwords do not match", "danger"); //msg, type
		} else {
			this.props.register({ username, email, password });
		}
	}

	changeVisibility = (e) => {		
		const password = document.getElementById("password");
		const icon = document.getElementById("visibilityIcon");

		if (password.type === "password") {
			password.type = "text";
			icon.classList.add("visibilityBlue");
		} else {
			password.type = "password";
			icon.classList.remove("visibilityBlue");
		}
	}


	render() {
		//Redirect if logged in
		if(this.props.isAuthenticated) {
			return <Redirect to="/"/>
		}
				
		return (
			<div id="signUp" className="fixedHeight">

				<form onSubmit={this.onSubmit} className="formBox">
					
					<p className="subtitlesT whiteTitle">Create<br/>your account</p>

					<div  className="formSection">
						<input onChange={this.handleInput} type="text" name="username" id="user_name" required/>
						<label htmlFor="user_name"  className="labelBox">
							<span className="labelContent">User Name</span>
						</label>
					</div>
	
					<div className="formSection">
						<input onChange={this.handleInput} type="email" name="email" id="email" required/>
						<label htmlFor="email" className="labelBox">
							<span className="labelContent">Contact Email</span>
						</label>
					</div>
	
					<div className="formSection">
						<input onChange={this.handleInput} type="password" name="password" id="password" required/>
						<label htmlFor="password" className="labelBox">
							<span className="labelContent">Password</span>
						</label>
						<FontAwesomeIcon onClick={this.changeVisibility} icon={faEye} className="visibilityIcon" id="visibilityIcon"/>
					</div>

					<div  className="formSection">
						<input onChange={this.handleInput} type="password" name="password2" id="password2" required/>
						<label htmlFor="password2" className="labelBox">
							<span className="labelContent">Confirm Password</span>
						</label>
						<FontAwesomeIcon onClick={this.changeVisibility} icon={faEye} className="visibilityIcon" id="visibilityIcon"/>
					</div>
	
					<div className="btnsBox2">
						<input className="transparentBtn" type="submit" name="submit" value="Send"></input>
						<a className="secondaryBtn" href="/sign_in">Log in</a>
					</div>
				</form>
				
				{/* //todo: */}
				{/* <SignInSM/> */}

				{/* --- BACKGROUND --- */}
				<div className="mascaraExtra"></div>
				<LandingBg/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (newUser) => dispatch(register(newUser)),
		setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpP);