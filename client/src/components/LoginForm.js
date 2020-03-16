import React, { Component } from "react"
import { connect } from "react-redux"
import { loginUser } from "../store/actions/userActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'


class LoginForm extends Component {
	state = {
		email: "",
		password: ""
	}

	// [e.target.name]: e.target.value
	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		console.log("sent account data: " + this.state.email + " " + this.state.password)

		this.props.loginUser(this.state)
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
	
					{/* <div className="formSection">
						<input onChange={this.handleInput} type="text" name="email" id="email" required />
						<label htmlFor="email" className="labelBox">
							<span className="labelContent">Contact Email</span>
						</label>
					</div> */}
	
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
		loginUser: (newUser) => dispatch(loginUser(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
// export default LoginForm;