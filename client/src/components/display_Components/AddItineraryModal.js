import React, { Component } from "react"
import { connect } from "react-redux"
import { Modal } from "reactstrap";
import BtnSignInInside from "../UI_Components/BtnSignInInside"
import axios from "axios"


class AddItineraryModal extends Component {
	state = {
		isOpen: false,
		city: "",
		title: "",
		img: null,
		summary: "",
		duration: "",
		price: "",
		rating: ""	
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	handleAddItin = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleImgSelect = (e) => {
		this.setState({
			img: e.target.files[0]
		})	
	}

	
	handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("img", this.state.img, this.state.img.name);
		formData.append("city", this.state.city);
		formData.append("title", this.state.title);
		formData.append("summary", this.state.summary);
		formData.append("duration", this.state.duration);
		formData.append("price", this.state.price);
		formData.append("rating", this.state.rating);

		console.log(formData);
		
		axios.post("http://localhost:5000/itineraries/itinerary", formData, this.tokenConfigFiles())
			.then(res => {
				console.log(res);
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
	
	render() {
		const { isAuthenticated } = this.props.auth

		return (
			<div id="newItinerary" className="center">

				<div className="addNewBox">
					<button className="addNewBtn" onClick={this.toggle}>+</button>
					<span>Add new itinerary</span>
				</div>
	
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					{ isAuthenticated ? 
						// { --- ADD CITY --- } 
						<form className="addItinForm" onSubmit={this.onSubmit}>
							<p className="sectionTitle">Add a new itinerary</p>
							<div className="input">
								
								<label htmlFor="city">City</label>
								<input type="text" id="city" onChange={this.handleAddItin} required />
								
								<label htmlFor="title">Title</label>
								<input type="text" id="title" onChange={this.handleAddItin} />

								<label htmlFor="img">Images</label>
								<input type="file" id="img" onChange={this.handleImgSelect}/>
								{/* <button onClick={this.fileUploadHandler}>Upload</button> */}

								<label htmlFor="summary">Summary</label>
								<input type="text" id="summary" onChange={this.handleAddItin} required />

								<label htmlFor="duration">Duration</label>
								<input type="text" id="duration" onChange={this.handleAddItin} required />

								<label htmlFor="price">Price</label>
								<input type="text" id="price" onChange={this.handleAddItin} required />

								<label htmlFor="rating">Rating</label>
								<input type="text" id="rating" onChange={this.handleAddItin} required />


								<button className="btnInside" onClick={this.handleSubmit}>Add itinerary</button>
							</div>
						</form>
					: <BtnSignInInside/>
					} 
				</Modal>
			
			</div>
		)	
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		auth: state.auth //state. el reducer que quiero. la var que quiero
	}
}

export default connect(mapStateToProps, null)(AddItineraryModal);