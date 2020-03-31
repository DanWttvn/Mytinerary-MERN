import React, { Component } from "react"
import {NavLink} from "react-router-dom"
import LandingBg from "../components/UI_Components/LandingBg"
import { connect } from "react-redux"

import { loadUser, sendTokenSM } from '../store/actions/authActions';


class LandingPage extends Component {

	componentDidMount() {
		const tokenURL = this.props.match.params.token
		if(tokenURL) {
			console.log("updating token in compoennt:", tokenURL);	
			this.props.sendTokenSM(tokenURL)
		}
	}
	
	render() {
		const { isAuthenticated, user } = this.props.auth
		return (
			<div className="fixedHeight">
				<div className="textOnTop">

					{ isAuthenticated ? 
						<div className="landingMsg" >
							<p className="titlesT bigLetters">{`Welcome, ${user.username}!`}</p>
							<div className="btnsBox3">
								<button className="transparentBtn"><NavLink to="/cities">Explore></NavLink></button>
							</div>
						</div>
						
						: <div className="landingMsg">
							  <p className="titlesT hugeLetters">Visit,<br/>Explore,<br/>Enjoy!</p>
							  <div className="btnsBox1">
								  <button className="transparentBtn"><NavLink to="/sign_in">Sign in</NavLink></button>
								  <NavLink className="secondaryBtn" to="/cities">Enter as a guest</NavLink>
							  </div>
						  </div>
					}

				</div>
				<LandingBg/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}	
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadUser: () => dispatch(loadUser()),
		sendTokenSM: (tokenURL) => dispatch(sendTokenSM(tokenURL)),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);