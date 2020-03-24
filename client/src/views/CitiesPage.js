import React, { Component } from "react"
// import {NavLink} from "react-router-dom"
import Logo from "../components/UI_Components/Logo"
import Navbar from "../components/UI_Components/Navbar"
import Searchbar from "../components/UI_Components/Searchbar"
import Cities from "../components/display_Components/Cities"
import AddItineraryModal from "../components/display_Components/AddItineraryModal"
import { connect } from "react-redux"
import { 
	// addCity, 
	getCities, filterCities } from "../store/actions/cityActions"


class CitiesPage extends Component {

	componentDidMount () {
		this.props.getCities()
		// console.log(this.state.cities)
	}

	filterWithSearchTerm = (searchTerm) => {
		// console.log(searchTerm);
		this.props.filterCities(searchTerm);
	}

	render() {
		// console.log(this.props.cities);

		return (
			<div id="CitiesPage" className="container">
				<Logo/>
				<p className="titlesT mainTitle">Where are you going?</p>
				<Searchbar getSearchTerm={this.filterWithSearchTerm} />
				<Cities cities={this.props.cities} />	
				<AddItineraryModal /> 
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		cities: state.cities.cities //state. el reducer que quiero. la var que quiero
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// now i can call this function with props.addCity
		getCities: (cities) => dispatch(getCities(cities)),
		filterCities: (searchTerm) => dispatch(filterCities(searchTerm))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesPage);