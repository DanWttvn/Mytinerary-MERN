import React, { Component, Fragment } from 'react';
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import ImageUploader from "react-images-upload"
import { deleteItinerary, addActivity, deleteActivity } from "../../store/actions/itinerary"


class ItineraryOptions extends Component {
	state = {
		title: "",
		img: null,
		showOpts: false,
		showAddFrom: false
	}

	showHideOpts = () => {
		let showOpts = !this.state.showOpts
		this.setState({
			showOpts
		})
		const itinOpts = document.querySelector(".itin-opts-dropdown")
		itinOpts.style.display = showOpts ? "block" : "none"
	}

	showHideForm = () => {
		let showAddFrom = !this.state.showAddFrom
		this.setState({
			showAddFrom
		})
		const itinOpts = document.querySelector(".add-form add-itin-form")
		itinOpts.style.display = showAddFrom ? "block" : "none"
	}

	handleAddItin = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleImgSelect = (pictureFiles, pictureDataURLs) => {
		this.setState({
			img: pictureFiles[0]
		})
	}
	
	handleSubmit = async e => {
		e.preventDefault();
		const { _id } = this.props.itinerary

		const formData = new FormData();
		formData.append("img", this.state.img, this.state.img.name);
		formData.append("title", this.state.title);		

		await this.props.addActivity(_id, formData)

		document.querySelector(".add-form add-itin-form").reset();		
		const imgPreview = document.querySelector(".uploadPictureContainer")
		imgPreview.parentNode.removeChild(imgPreview);
	}

	render() {
		const { _id, activities } = this.props.itinerary

		return (
			<Fragment>

				{/* Menu */}
				<div className="opts-wrapper">
					<button className="edit-itin-btn" onClick={this.showHideOpts}><FontAwesomeIcon icon={faPen} /></button>
					<ul className="itin-opts-dropdown">
						<li onClick={() => document.querySelector(".modal").classList.add("modal-open")}>Edit Activities</li>
						{/* //! falta comprobar: ultimo (poner this.props.delete) */}
						<li onClick={() => deleteItinerary(_id)} className="">Delete Itinerary</li>
					</ul>
				</div>

				{/* Actions modal */}
				<div className="modal">
					<div className="modal-backdrop" onClick={() => document.querySelector(".modal").classList.remove("modal-open")}></div>
					<div className="modal-window">
						{/* Add Activity */}
						<p className="title-section" onClick={this.showHideForm}>Add Activity</p>
						<form className="add-form add-itin-form" onSubmit={this.handleSubmit}>		
							<label htmlFor="title">Title</label>
							<input type="text" id="title" onChange={this.handleAddItin} required />
							
							<label htmlFor="img">Images</label>
							<ImageUploader
								withIcon={true}
								buttonText="Choose image"
								onChange={this.handleImgSelect}
								imgExtension={[".jpg", ".jpeg", ".png"]}
								maxFileSize={10485760}
								withPreview={true}
							/>
							<div className="btn-box">
								<button className="btn-inside" onClick={this.handleSubmit}>Add</button>
							</div>
						</form>
				
						{/* Delete Activity  */}
						<p className="title-section">Delete Activity</p>
						{activities.map((activity, i) => {
							//? Change before deploy? a // const imgURL = "url(" + activity.img + ")"
						const imgURL = activity.img.startsWith("uploads") ? `url(/${activity.img})` : `url(${activity.img})`
						const imgURLDisplay = imgURL.replace(/\\/g, "/");

							return (
								<div className="city-card" key={i}>
									<div className="thumbnail" style={
										{backgroundImage: imgURLDisplay, 
										backgroundPosition: 'center center', 
										backgroundSize: 'cover'}}></div>
									<p className="city-name-thumb">{activity.title}</p>
									<button onClick={() => this.props.deleteActivity(_id, activity._id)} type="button" className=""><FontAwesomeIcon icon={faTimes}/></button>
								</div>
							)
						})}
					</div>
				</div>
			</Fragment>
		)

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteItinerary: (itin_id) => dispatch(deleteItinerary(itin_id)),
		addActivity: (itin_id, formData) => dispatch(addActivity(itin_id, formData)),
		deleteActivity: (itin_id, activity_id) => dispatch(deleteActivity(itin_id, activity_id))
	}
}

export default connect(null, mapDispatchToProps)(ItineraryOptions);