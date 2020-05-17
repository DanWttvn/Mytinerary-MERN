import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import LandingBg from "../elements/LandingBg"
import SignInSM from "../elements/SignInSM"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { login } from "../../store/actions/auth"
import PropTypes from "prop-types"


class SignInP extends Component {

	state = {
		email: "",
		password: ""
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = e => {		
		e.preventDefault();
		const { email, password } = this.state;

		// Attempt to login
		this.props.login(email, password);
	}

	changeVisibility = () => {
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
			<div id="sign-inP" className="--fixed-height">
				
				<form onSubmit={this.onSubmit} className="form-box">

					<p className="subtitles-font title-white">Log into <br/>your account</p>

					<div className="form-section">
						<input onChange={this.handleInput} type="email" name="email" id="email" required/>
						<label htmlFor="email" className="label-box">
							<span className="label-content">Contact Email</span>
						</label>
					</div>
			
					<div  className="form-section">
						<input onChange={this.handleInput} type="password" name="password" id="password" required/>
						<label htmlFor="password" className="label-box">
							<span className="label-content">Password</span>
						</label>
						<FontAwesomeIcon onClick={this.changeVisibility} icon={faEye} className="visibility-icon" id="visibility-icon"/>
					</div>
	
					<div className="btns-box2">
						<input className="btn-transparent" type="submit" name="submit" value="Send"></input>
						<a className="btn-secondary" href="/sign_up">Create Account</a>
					</div>				
				</form>

				<SignInSM/>

				<div className="mascara-extra"></div>
				<LandingBg/>
			</div>
		)
	}
}

SignInP.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(login(email, password)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInP);
