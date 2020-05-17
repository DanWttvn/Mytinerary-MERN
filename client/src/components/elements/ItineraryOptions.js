import React, { Component, Fragment } from 'react';
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ImageUploader from "react-images-upload"
import { deleteItinerary, addActivity, deleteActivity } from "../../store/actions/itinerary"

//* CAMBIAR CON STATE
//* dejar modal con hooks
//? probar a manita
class ItineraryOptions extends Component {
	state = {
		title: "",
		img: null
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
	
	handleSubmit = (e) => {
		const { id } = this.props.itinerary

		e.preventDefault();

		const formData = new FormData();
		formData.append("img", this.state.img, this.state.img.name);
		formData.append("title", this.state.title);

		this.props.addActivity(id, formData)

		// this.toggle(); //* con doc.quer
	}

	render() {
		const { id, activities } = this.props.itinerary

		return (
			<Fragment>
				{/* 3 puntitos */}
				<div className="itin-opt-box content">
					{/* edit activity: open modal */}
					<button onClick={() => document.querySelector(".modal").classList.add("modal-open")}>Edit Activities</button>
					<button onClick={() => deleteItinerary(id)} className="">Delete Itinerary</button>
				</div>


				<div className="modal">
					<div className="modal-backdrop" onClick={() => document.querySelector(".modal").classList.remove("modal-open")}></div>
					<div className="modal-window">
						{/* Add Activity  */}
						{/* //* HACER COLLAPSE */}
						<button >Add Activity</button>
						<form className="add-itin-form" onSubmit={this.handleSubmit}>
							<p className="title-section">Add a new activity</p>
							<div className="input">
								
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
								<button className="btn-inside" onClick={this.handleSubmit}>Add activity</button>
							</div>
						</form>
				

						{/* Delete Activity  */}
						{activities.map(activity => {
							const imgURL = "url(" + activity.img + ")"
							const imgURLDisplay = imgURL.replace(/\\/g, "/"); 

							return (
								<div className="city-card" >
									<div className="thumbnail" style={
										{backgroundImage: imgURLDisplay, 
										backgroundPosition: 'center center', 
										backgroundSize: 'cover'}}></div>
									<p className="city-name-thumb">{activity.title}</p>
									<button onClick={() => deleteActivity(id, activity.id)} type="button" className=""><FontAwesomeIcon icon={faTimes}/></button>
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