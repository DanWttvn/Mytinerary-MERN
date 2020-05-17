import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { register } from "../../store/actions/auth"
import LandingBg from "../elements/LandingBg"
import SignInSM from "../elements/SignInSM"
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
		const icon = document.getElementById("visibility-icon");

		if (password.type === "password") {
			password.type = "text";
			icon.classList.add("visibility-blue");
		} else {
			password.type = "password";
			icon.classList.remove("visibility-blue");
		}
	}


	render() {
		//Redirect if logged in
		if(this.props.isAuthenticated) {
			return <Redirect to="/"/>
		}
				
		return (
			<div id="sign-upP" className="--fixed-height">

				<form onSubmit={this.onSubmit} className="form-box">
					
					<p className="subtitles-font title-white">Create<br/>your account</p>

					<div  className="form-section">
						<input onChange={this.handleInput} type="text" name="username" id="user_name" required/>
						<label htmlFor="user_name"  className="label-box">
							<span className="label-content">User Name</span>
						</label>
					</div>
	
					<div className="form-section">
						<input onChange={this.handleInput} type="email" name="email" id="email" required/>
						<label htmlFor="email" className="label-box">
							<span className="label-content">Contact Email</span>
						</label>
					</div>
	
					<div className="form-section">
						<input onChange={this.handleInput} type="password" name="password" id="password" required/>
						<label htmlFor="password" className="label-box">
							<span className="label-content">Password</span>
						</label>
						<FontAwesomeIcon onClick={this.changeVisibility} icon={faEye} className="visibility-icon" id="visibility-icon"/>
					</div>

					<div  className="form-section">
						<input onChange={this.handleInput} type="password" name="password2" id="password2" required/>
						<label htmlFor="password2" className="label-box">
							<span className="label-content">Confirm Password</span>
						</label>
						<FontAwesomeIcon onClick={this.changeVisibility} icon={faEye} className="visibility-icon" id="visibility-icon"/>
					</div>
	
					<div className="btns-box2">
						<input className="btn-transparent" type="submit" name="submit" value="Send"></input>
						<a className="btn-secondary" href="/sign_in">Log in</a>
					</div>
				</form>
				
				{/* //todo: */}
				<SignInSM/>

				{/* --- BACKGROUND --- */}
				<div className="mascara-extra"></div>
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