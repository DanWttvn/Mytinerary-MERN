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

	onSubmit = async e => {		
		e.preventDefault();
		const { email, password } = this.state;

		// Attempt to login
		this.props.login(email, password);
	}

	changeVisibility = () => {
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
			<div id="signIn" className="fixedHeight">
				
				<form onSubmit={this.onSubmit} className="formBox">

					<p className="subtitlesT whiteTitle">Log into <br/>your account</p>

					<div className="formSection">
						<input onChange={this.handleInput} type="email" name="email" id="email" />
						<label htmlFor="email" className="labelBox">
							<span className="labelContent">Contact Email</span>
						</label>
					</div>
			
					<div  className="formSection">
						<input onChange={this.handleInput} type="password" name="password" id="password"/>
						<label htmlFor="password" className="labelBox">
							<span className="labelContent">Password</span>
						</label>
						<FontAwesomeIcon onClick={this.changeVisibility} icon={faEye} className="visibilityIcon" id="visibilityIcon"/>
					</div>
	
					<div className="btnsBox2">
						<input className="transparentBtn" type="submit" name="submit" value="Send"></input>
						<a className="secondaryBtn" href="/sign_up">Create Account</a>
					</div>				
				</form>

				<SignInSM/>

				<div className="mascaraExtra"></div>
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
