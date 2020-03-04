import React, { Component } from "react"


class AddCityForm extends Component {
	state = {
		newCity: "",
		newCityCountry: "",
	}

	handleAddCityChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value //id es newCity y newCityCountry, perfect para varios campos
		})
	}

	handleAddCitySubmit = (e) => {
		e.preventDefault();
		this.props.getNewCity(this.state)
	}
	
	
	render() {
		
		return (
			<form id="addCityForm" onSubmit={this.handleAddCitySubmit}>
				<span className="Add a new city"></span>
				<div className="input">
					<label htmlFor="newCity"></label>
					<input type="text" id="newCity" onChange={this.handleAddCityChange} />
					<input type="text" id="newCityCountry" onChange={this.handleAddCityChange} />
					<button>Add City</button>
				</div>
			</form>
		)	
	}
}

export default AddCityForm;