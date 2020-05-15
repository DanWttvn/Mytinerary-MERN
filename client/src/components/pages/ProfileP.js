import React, {Component} from "react"
import { connect } from "react-redux"
import Navbar from "../elements/Navbar"
import Logo from "../elements/Logo"
import LogoutBtn from "../elements/LogoutBtn"
import SignInBtn from "../elements/SignInBtn"
// import Spinner from "../elements/Spinner"
import { Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import ImageUploader from "react-images-upload"
import { updateAvatar } from "../../store/actions/auth"


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
		   avatar = user.avatar.startsWith("uploads") ? `/${user.avatar}` : user.avatar;
	   }

		return (
			<div id="ProfileP" className="container">
				<Logo/>
				<p className="titles-font title-main">Profile</p>

				{/* {loading ? (
					<Spinner/>
				):(
				)} */}
				
				{ !loading && isAuthenticated ? (
					<div className="center">
						<div className="profile-box">
							<p className="subtitles-font subtitle">{`Welcome, ${user.username}`}</p>
							<div className="avatar-box">
								{ user.avatar ? 
									<img src={avatar} alt="profile pic"/>
									: <FontAwesomeIcon icon={faUser} className="fa-profile-icon"/>
								}
							</div>
							<button className="edit-btn" onClick={this.toggle}><FontAwesomeIcon icon={faPen} /></button>

							<p>{ user.username }</p>
							<p>{ user.email }</p>
						</div>
						
						<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
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
						</Modal>

						<div className="center">
							<LogoutBtn/>
						</div>
					</div>
				):(
					<SignInBtn/>
				)}		

				<Navbar/>
			</div>
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