import React, {Component} from "react"
import Navbar from "../components/UI_Components/Navbar"
import Logo from "../components/UI_Components/Logo"
import Logout from "../components/UI_Components/BtnLogout"
import { connect } from "react-redux"
// import PropTypes from "prop-types"
// import SignInPage from "../views/SignInPage"


class Profile extends Component {

	// static propTypes = {
	// 	auth: PropTypes.object.isRequired
	// }

	render () {

		return (
			<div id="Profile" className="container">
				<Logo/>

				<p className="titlesT mainTitle">Profile</p>

				<div className="profileBox">
					<p className="subtitlesT subtitle">{`Welcome, ${this.props.user.username}`}</p>
					{/* img */}
					<div></div> 
					<p>{ this.props.user.username }</p>
					<p>{ this.props.user.email }</p>

				</div>

				<div className="center">
					<Logout/>
				</div>

				<Navbar/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, null)(Profile);