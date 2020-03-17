import React, {Component} from "react"
import Navbar from "../components/Navbar"
import Logout from "../components/Logout"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import SignInPage from "../views/SignInPage"


class Profile extends Component {

	static propTypes = {
		auth: PropTypes.object.isRequired
	}

	render () {
		const { isAuthenticated, user } = this.props.auth 

		return (
			<div id="Profile">
				<h3>Profile</h3>
				
				{ isAuthenticated ? (
					// Profile info 
					<div id="LoggedInInfo">
						<Navbar/>
						{`Welcome ${user.username}`}
						{/* { user.username } */}
						<Logout/>
					</div>
					
				) : ( 
					<SignInPage/>
				)}

			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

// const mapDispatchToProps = (dispatch) => {
// 	return {

// 	}
// }

export default connect(mapStateToProps, null)(Profile);