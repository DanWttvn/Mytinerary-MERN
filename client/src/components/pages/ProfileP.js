import React, {Component, Fragment} from "react"
import { connect } from "react-redux"
import Navbar from "../elements/Navbar"
import Logo from "../elements/Logo"
import LogoutBtn from "../elements/LogoutBtn"
import SignInBtn from "../elements/SignInBtn"
// import Spinner from "../elements/Spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import ImageUploader from "react-images-upload"
import { updateAvatar } from "../../store/actions/auth"


class Profile extends Component {
	state = {
		profileImg: null
	}

	imgSelectHandler = (pictureFiles, pictureDataURLs) => {
		this.setState({
			profileImg: pictureFiles[0]
		})
	}

	fileUploadHandler = () => {
		const formData = new FormData();
		formData.append("avatar", this.state.profileImg, this.state.profileImg.name);

		this.props.updateAvatar(formData)
	}

	render () {
		const { isAuthenticated, user, loading } = this.props.auth
		let avatar = ""
		if(!loading &&
			isAuthenticated
				&& user.avatar ){
					//! aqui no pone localhost, pero si la /
				   avatar = user.avatar.startsWith("uploads") ? `/${user.avatar}` : user.avatar;
	   }

		return (
			<Fragment>
				<Logo/>
				<div id="ProfileP" className="container">
					<p className="titles-font title-main">Profile</p>
					
					{ !loading && isAuthenticated ? ( //todo: nest loading con isAuth para meter spinner
						<div className="center">
							<div className="profile-box">
								<p className="subtitles-font subtitle">{`Welcome, ${user.username}`}</p>
								<div className="avatar-box">
									{ user.avatar ? 
										<img src={avatar} alt="profile pic"/>
										: <FontAwesomeIcon icon={faUser} className="fa-profile-icon"/>
									}
								</div>
								<button className="edit-btn" onClick={() => document.querySelector(".modal").classList.add("modal-open")}><FontAwesomeIcon icon={faPen} /></button>

								<p>{ user.username }</p>
								<p>{ user.email }</p>
							</div>
							
							<div className="modal">
								<div className="modal-backdrop" onClick={() => document.querySelector(".modal").classList.remove("modal-open")}></div>
								<div className="modal-window">
									<div className="modal-profile-box">
										<ImageUploader
											withIcon={true}
											buttonText="Choose image"
											onChange={this.imgSelectHandler}
											imgExtension={[".jpg", ".jpeg", ".png"]}
											maxFileSize={10485760}
											withPreview={true}
										/>
										<button className="btn-inside" onClick={this.fileUploadHandler}>Upload</button>
									</div>
								</div>
							</div>

							<div className="center">
								<LogoutBtn/>
							</div>
						</div>
					):(
						<SignInBtn/>
					)}		

				</div>
				<Navbar/>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

const mapDispatchToProps = (dispatch) => {
	return {
		updateAvatar: (formData) => dispatch(updateAvatar(formData))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);