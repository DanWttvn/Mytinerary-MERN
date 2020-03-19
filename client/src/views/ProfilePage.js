import React, {Component} from "react"
import Navbar from "../components/UI_Components/Navbar"
import Logout from "../components/display_Components/BtnLogout"
import { connect } from "react-redux"
import PropTypes from "prop-types"
// import SignInPage from "../views/SignInPage"


class Profile extends Component {

	static propTypes = {
		auth: PropTypes.object.isRequired
	}

	render () {
		const { user } = this.props.auth 

		return (
			<div id="Profile">
				<h3>Profile</h3>
				<Navbar/>
				{`Welcome, ${user.username}`}
				{/* { user.username } */}
				<Logout/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, null)(Profile);