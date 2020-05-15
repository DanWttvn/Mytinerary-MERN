import React, { Component } from "react"
import {NavLink} from "react-router-dom"
import LandingBg from "../elements/LandingBg"
import { connect } from "react-redux"
// import { loadUser, 
// 	//* falta sendTokenSM
//  } from '../../store/actions/auth';


class LandingP extends Component {
	// ! mirar como antes para consegui el nombre aqui antes de que dispatch loaduser

	componentDidMount() {
		const tokenURL = this.props.match.params.token
		if(tokenURL) {
			console.log("updating token in compoennt:", tokenURL);	
			//* this.props.sendTokenSM(tokenURL) 
		}
	}
	
	render() {
		const { isAuthenticated, user, loading } = this.props.auth
		return (
			<div className="fixed-height">
				<div className="text-on-top">
					
					{ !loading && isAuthenticated ? (
						<div className="landing-msg">
							<p className="titles-font big-letters">{`Welcome, ${user.username}!`}</p>
							<div className="btns-box3">
								<button className="btn-transparent"><NavLink to="/cities">Explore ></NavLink></button>
							</div>
						</div>
					):(
						<div className="landing-msg">
							<p className="titles-font huge-letters">Visit,<br/>Explore,<br/>Enjoy!</p>
							<div className="btns-box1">
								<button className="btn-transparent"><NavLink to="/sign_in">Sign in</NavLink></button>
								<NavLink className="btn-secondary" to="/cities">Enter as a guest</NavLink>
							</div>
						</div>
					)}

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
		// loadUser: () => dispatch(loadUser()),
		//* sendTokenSM: (tokenURL) => dispatch(sendTokenSM(tokenURL)), 
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingP);