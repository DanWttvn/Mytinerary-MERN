import React, { Component } from "react"
import { connect } from "react-redux"
import { Modal } from "reactstrap";
import SignInBtn from "../elements/SignInBtn"
import ImageUploader from "react-images-upload"
import { addItinerary } from "../../store/actions/itinerary"



class AddItinerary extends Component {
	state = {
		isOpen: false,
		city: "",
		country: "",
		title: "",
		img: null,
		summary: "",
		duration: "",
		price: "",
		hashtags: ""	
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
	handleImgSelect = (pictureFiles, pictureDataURLs) => {
		this.setState({
			img: pictureFiles[0]
		})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("img", this.state.img, this.state.img.name);
		formData.append("city", this.state.city);
		formData.append("country", this.state.country);
		formData.append("title", this.state.title);
		formData.append("summary", this.state.summary);
		formData.append("duration", this.state.duration);
		formData.append("price", this.state.price);
		formData.append("hashtags", this.state.hashtags);

		this.props.addItinerary(formData)

		this.toggle();
	}
	
	render() {
		const { isAuthenticated } = this.props.auth

		return (
			<div id="newItinerary" className="center">

				<div className="add-new-box">
					<button className="addNewBtn" onClick={this.toggle}>+</button>
					<span>Add new itinerary</span>
				</div>

				{/* //todo: modal no funciona */}
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					{ isAuthenticated ? 
						(<form className="add-itin-form" onSubmit={this.handleSubmit}>
							<p className="title-section">Add a new itinerary</p>
							<div className="input">
								
								<label htmlFor="title">Title</label>
								<input type="text" id="title" onChange={this.handleAddItin} />
								
								<label htmlFor="city">City</label>
								<input type="text" id="city" onChange={this.handleAddItin} required />

								<label htmlFor="country">Country</label>
								<input type="text" id="country" onChange={this.handleAddItin} required />
								
								<label htmlFor="img">Images</label>
								<ImageUploader
									withIcon={true}
									buttonText="Choose image"
									onChange={this.handleImgSelect}
									imgExtension={[".jpg", ".jpeg", ".png"]}
									maxFileSize={10485760}
									withPreview={true}
								/>

								<label htmlFor="summary">Summary</label>
								<input type="text" id="summary" onChange={this.handleAddItin} required />

								<label htmlFor="duration">Duration</label>
								<input type="text" id="duration" onChange={this.handleAddItin} required />

								<label htmlFor="price">Price</label>
								<input type="text" id="price" onChange={this.handleAddItin} required />

								<label htmlFor="hashtags">Hastags</label>
								<input type="text" id="hashtags" placeholder="" onChange={this.handleAddItin} required />
								<small className="form-text">* Please use comma separated values</small>

								<button className="btn-inside" onClick={this.handleSubmit}>Add itinerary</button>
							</div>
						</form>
					):(
						<SignInBtn/>
					)} 
				</Modal>
			
			</div>
		)	
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addItinerary: (formData) => dispatch(addItinerary(formData))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AddItinerary);