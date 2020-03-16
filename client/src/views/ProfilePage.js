import React, {Component} from "react"
import Navbar from "../components/Navbar"
import Logout from "../components/Logout"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { loadUser } from "../store/actions/authActions"
import LandingBg from "../components/LandingBg"
import LoginForm from "../components/LoginForm"


class Profile extends Component {

	static propTypes = {
		auth: PropTypes.object.isRequired
	}

	componentDidMount() {
		this.props.loadUser()
	}

	render () {
		const { isAuthenticated, user } = this.props.auth 

		const profileInfo = (
			<div id="LoggedInInfo">
				<Navbar/>
				{ user ? user.username : null }
				<Logout/>
			</div>
		)
		
		const signInPage = (
			<div id="signIn" className="fixedHeight">
				<h1>SIGN IN</h1>
				<LoginForm/>
				<a className="google-btn" href="/sign_up">Create Account</a> {/* 3000/auth/google */}
				<div className="mascaraExtra"></div>
				<LandingBg/>
			</div>
		)

		return (
			<div id="Profile">
				<h3>Profile</h3>
				{ isAuthenticated ? profileInfo : signInPage }
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
	return {
		loadUser: () => dispatch(loadUser())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);