import React, { Component } from "react"

class NewAccount extends Component {
	state = {
		userName: "",
		password: "",
		contactEmail: ""
	}

	// [e.target.name]: e.target.value
	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = (e) => {
		alert("user submited: " + this.state.userName + " " + this.state.password + " " +  this.state.contactEmail)
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} className="formBox">

				<div  className="formSection">
					<input onChange={this.handleInput} type="text" name="userName" id="user_name" required/>
					<label htmlFor="user_name"  className="labelBox">
						<span className="labelContent">User Name</span>
					</label>
				</div>

				<div  className="formSection">
					<input onChange={this.handleInput} type="text" name="password" id="password" required/>
					<label htmlFor="password"  className="labelBox">
						<span  className="labelContent">Password</span>
					</label>
				</div>

				<div className="formSection">
					<input onChange={this.handleInput} type="text" name="contactEmail" id="contact_email" required />
					<label htmlFor="contact_email" className="labelBox">
						<span className="labelContent">Contact Email</span>
					</label>
				</div>

				<input className="sendButton" type="submit" name="submit" value="Send"></input>
			</form>
		)
	}
}

export default NewAccount;