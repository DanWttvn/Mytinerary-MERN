import React, { Component } from "react"
import { connect } from "react-redux"
import { Modal } from "reactstrap";
import { addCity } from "../../store/actions/cityActions"
import BtnSignInInside from "../UI_Components/BtnSignInInside"



class AddItineraryModal extends Component {
	state = {
		isOpen: false,
		newTitle: "",
		newCityCountry: "",
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	handleAddCityChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value //id es newCity y newCityCountry, perfect para varios campos
		})
	}

	onSubmit = (e) => {
		e.preventDefault();

		// const newItin = {
		// 	name: this.state.name title? copiar datos
		// }
		// this.props.addNewItinerary(newItin)
	}
	
	
	render() {
		const { isAuthenticated } = this.props.auth

		return (
			<div id="newItinerary">
				<div className="addNewBox">
					<button className="addNewBtn" onClick={this.toggle}>+</button>
					<span>Add new itinerary</span>
				</div>
	
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					{ isAuthenticated ? (
						// ADD CITY 
						<form className="addItinForm" onSubmit={this.onSubmit}>
							<h6>Add a new itinerary</h6>
							<div className="input">
								<label htmlFor="newTitle">Title</label>
								<input type="text" id="newTitle" onChange={this.handleAddCityChange} />
								<label htmlFor="newTitle">City</label>
								<input type="text" id="newCity" onChange={this.handleAddCityChange} />
								{/* <button>Add City</button> */}
								<input className="submitItinBtn" type="submit" name="submit" value="Send"></input>
							</div>
						</form>
					) : (
						// LOG IN
						<div>
							<p>Sign in to add new itineraries</p>
							<BtnSignInInside/>
						</div>
					)} 
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

const mapDispatchToProps = (dispatch) => {
	return {
		//get the action function imported
		addCity: (newCity) => dispatch(addCity(newCity))
		// now i can call this function with props.addCity
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddItineraryModal);