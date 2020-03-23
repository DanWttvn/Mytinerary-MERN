import React, {Component} from "react"
import Navbar from "../components/UI_Components/Navbar"
import Logo from "../components/UI_Components/Logo"
import Logout from "../components/UI_Components/BtnLogout"
import { connect } from "react-redux"
// import PropTypes from "prop-types"
// import SignInPage from "../views/SignInPage"

import axios from "axios"


class Profile extends Component {

	state = {
		profileImg: null
	}

	imgSelectHandler = (e) => {
		this.setState({
			profileImg: e.target.files[0]
		})
	}

	// fileUploadHandler = () => {
	// 	axios.post("")

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

				<input type="file" onChange={this.imgSelectHandler}/>
				<button onClick={this.fileUploadHandler}>Upload</button>

				<Navbar/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, null)(Profile);