import React, {Component} from "react"
import Navbar from "../components/Navbar"
import Logout from "../components/Logout"


class Profile extends Component {
	render () {
		return (
			<div id="Profile">
				<Navbar/>

				<h3>Profile</h3>

				<Logout/>

			</div>
		)
	}
}

export default Profile;