import React, {Component} from "react"
import { connect } from "react-redux"
import Navbar from "../components/UI_Components/Navbar"
import Logo from "../components/UI_Components/Logo"
import Logout from "../components/UI_Components/BtnLogout"
import BtnSignInInside from "../components/UI_Components/BtnSignInInside"
import { Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import ImageUploader from "react-images-upload"
import { updateAvatar } from "../store/actions/auth"


class Profile extends Component {
	state = {
		isOpen: false,
		profileImg: null
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	// ------ PROFILE IMG CONFIG ------ //
	imgSelectHandler = (pictureFiles, pictureDataURLs) => {
		this.setState({
			profileImg: pictureFiles[0]
		})
	}

	// tokenConfigFiles = () => {
	// 	// Get token from localstorage
	// 	const token = localStorage.getItem("token") //authReducer -> localstorage
	// 	const config = {
	// 		headers: {
	// 			"Content-type" : "multipart/form-data"
	// 		}
	// 	}
	// 	// If token, add to headers
	// 	if (token) {
	// 		config.headers["Authorization"] = "bearer " + token;
	// 	}
	// 	return config
	// }

	fileUploadHandler = () => {
		const formData = new FormData();
		formData.append("avatar", this.state.profileImg, this.state.profileImg.name);
		console.log(formData);

		updateAvatar(formData)

		// axios.put("/api/user/info/avatar", fd, this.tokenConfigFiles())
		// 	.then(res => {
		// 		console.log(res);
		// 	})
		// 	.then(() => {
		// 		window.location.reload(true)
		// 	})
	}

	render () {
		const { isAuthenticated, user } = this.props.auth
		let avatar = ""
		if(isAuthenticated){
			avatar = user.avatar.startsWith("uploads") ? `/${user.avatar}` : user.avatar;
		}

		return (
			<div id="ProfilePage" className="container">
				<Logo/>

				<p className="titlesT mainTitle">Profile</p>
				
				{ isAuthenticated ?
					<div className="center">
						<div className="profileBox">
							<p className="subtitlesT subtitle">{`Welcome, ${user.username}`}</p>
							<div className="avatarBox">
								{ user.avatar ? 
									<img src={avatar} alt="profile pic"/>
									: <FontAwesomeIcon icon={faUser} className="faProfileIcon"/>
								}
							</div>
							<button className="editBtn" onClick={this.toggle}><FontAwesomeIcon icon={faPen} /></button>

							<p>{ user.username }</p>
							<p>{ user.email }</p>
						</div>
						
						<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
							<div className="modalProfileBox">
								<ImageUploader
									withIcon={true}
									buttonText="Choose image"
									onChange={this.imgSelectHandler}
									imgExtension={[".jpg", ".jpeg", ".png"]}
									maxFileSize={10485760}
									withPreview={true}
								/>
								<button className="btnInside" onClick={this.fileUploadHandler}>Upload</button>
							</div>
						</Modal>

						<div className="center">
							<Logout/>
						</div>
					</div>

					: <BtnSignInInside/>
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