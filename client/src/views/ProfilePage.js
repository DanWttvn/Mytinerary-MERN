import React, {Component} from "react"
import Navbar from "../components/UI_Components/Navbar"
import Logo from "../components/UI_Components/Logo"
import Logout from "../components/UI_Components/BtnLogout"
import { connect } from "react-redux"
// import PropTypes from "prop-types"
// import SignInPage from "../views/SignInPage"
import BtnSignInInside from "../components/UI_Components/BtnSignInInside"
// import {tokenConfigFiles} from "../store/actions/authActions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUser} from '@fortawesome/free-regular-svg-icons'



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

	tokenConfigFiles = () => {
		// Get token from localstorage
		const token = localStorage.getItem("token") //authReducer -> localstorage
		const config = {
			headers: {
				"Content-type" : "multipart/form-data"
			}
		}
		// If token, add to headers
		if (token) {
			config.headers["Authorization"] = "bearer " + token;
		}
		return config
	}

	fileUploadHandler = () => {
		const fd = new FormData();
		fd.append("profilePic", this.state.profileImg, this.state.profileImg.name);
		console.log(fd);

		axios.put("http://localhost:5000/user/info/profilePic", fd, this.tokenConfigFiles())
			.then(res => {
				console.log(res);
			})
			.then(() => {
				window.location.reload(true)
			})

	}

	render () {
		const { isAuthenticated, user } = this.props.auth

		return (
			<div id="Profile" className="container">
				<Logo/>

				<p className="titlesT mainTitle">Profile</p>
				
				{ isAuthenticated ?
					<div>
						<div className="profileBox">
							<p className="subtitlesT subtitle">{`Welcome, ${user.username}`}</p>
							<div className="profilePicBox">
								{ user.profilePic ? 
									<img src={ user.profilePic } alt="profile pic"/>
									: <FontAwesomeIcon icon={faUser} className="faProfileIcon"/>
								}
							</div>
							<p>{ user.username }</p>
							<p>{ user.email }</p>
						</div>
		
						<div className="center">
							<Logout/>
						</div>
		
						<input type="file" onChange={this.imgSelectHandler}/>
						<button onClick={this.fileUploadHandler}>Upload</button>
					</div>
					: <div>
					  	<p>Log in para ver esto</p>
					  	<BtnSignInInside/>
					  </div>
				}		

				<Navbar/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, null)(Profile);