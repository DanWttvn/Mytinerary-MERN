import React, { Component } from "react"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { login } from "../store/actions/authActions"
import { clearErrors } from "../store/actions/errorActions"
import PropTypes from "prop-types"

class LoginForm extends Component {
	state = {
		email: "",
		password: "",
		msg: null
	}

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	// TRAVERSY 11 min 17:30
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

	onSubmit = (e) => {
		e.preventDefault();
		console.log("sent account data: " + this.state.email + " " + this.state.password)

		const { email, password } = this.state;

		const currentUser = {
			email,
			password
		}
		// Attempt to login
		this.props.login(currentUser)
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
			<div>
				{/* REGULAR LOGIN */}
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
	
					<input className="sendButton" type="submit" name="submit" value="Send"></input>
				</form>
	
				{/* GOOGLE LOGIN */}
				<a className="google-btn" href="http://localhost:5000/auth/google">Google+</a> {/* 3000/auth/google */}+


			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
