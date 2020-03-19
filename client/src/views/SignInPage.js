import React, { Component } from "react"
import LandingBg from "../components/UI_Components/LandingBg"
// import LoginForm from "../components/--LoginForm"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { login } from "../store/actions/authActions"
import { clearErrors } from "../store/actions/errorActions"
import PropTypes from "prop-types"


class SignInPage extends Component {

	state = {
		email: "",
		password: "",
		msg: null
	}

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object,
		login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	componentDidUpdate(prevProps) {
		const { error } = this.props; // state this.prop.error
		if(error !== prevProps.error) {
			// Check for register error
			if(error.id === "LOGIN_FAIL") {
				console.log(error.msg); // son dos si express validatos
				this.setState({ msg: error.msg.msg })
			} else {
				this.setState({ msg: null })
			}
		}
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = async e => {
		e.preventDefault();
		console.log("sent account data: " + this.state.email + " " + this.state.password)
		
		try {
			const { email, password } = this.state;
			const currentUser = {
				email,
				password
			}
			// Attempt to login
			await this.props.login(currentUser);
			this.props.history.push("/cities"); 
		} catch (e) {
			console.log(e.message);
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
		return (
			<div id="signIn" className="fixedHeight">
				<h1>SIGN IN</h1>
				
				<form onSubmit={this.onSubmit} className="formBox">
					<div className="formSection">
						<input onChange={this.handleInput} type="email" name="email" id="email" required />
						<label htmlFor="email" className="labelBox">
							<span className="labelContent">Contact Email</span>
						</label>
					</div>
			
					<div  className="formSection">
						<input onChange={this.handleInput} type="password" name="password" id="password" required/>
						<label htmlFor="password" className="labelBox">
							<span className="labelContent">Password</span>
						</label>
						<FontAwesomeIcon onClick={this.changeVisibility} icon={faEye} className="visibilityIcon" id="visibilityIcon"/>
					</div>
	
					<div className="sendCreateBtnsBox">
						<input className="sendButton" type="submit" name="submit" value="Send"></input>
						
						<a className="createAccountBtn" href="/sign_up">Create Account</a>
					</div>
				
					{/* GOOGLE FB LOGIN */}
					<div className="signInWithThirds">
						<a className="GFB-btns google-btn" href="http://localhost:5000/auth/google">sign in with Google+</a>
						<a className="GFB-btns fb-btn" href="http://localhost:5000/auth/facebook">sign in with Facebook</a>
					</div>
				</form>				

				<div className="mascaraExtra"></div>
				<LandingBg/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (newUser) => dispatch(login(newUser)),
		clearErrors: (newUser) => dispatch(clearErrors(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
