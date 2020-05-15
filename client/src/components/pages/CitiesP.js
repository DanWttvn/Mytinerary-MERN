import React, { Component, Fragment } from "react"
// import {NavLink} from "react-router-dom"
import Logo from "../elements/Logo"
import Navbar from "../elements/Navbar"
import Searchbar from "../elements/Searchbar"
import Cities from "../layout/Cities"
import AddItinerary from "../layout/AddItinerary"
import { connect } from "react-redux"
import { getCities, filterCities } from "../../store/actions/city"
import Spinner from "../elements/Spinner"


class ItinerariesP extends Component {

	componentDidMount () {
		this.props.getCities()
	}

	//todo: figure out without duplicate
	// filterWithSearchTerm = (searchTerm) => {
	// 	this.props.filterCities(searchTerm);
	// }

	render() {
		const { cities, loading } = this.props.cities

		return (
			<div id="ItinerariesP" className="container">
				<Logo/>
				{loading ? (
					<Spinner/>
				):(
					<Fragment>
						<p className="titlesT mainTitle">Where are you going?</p>
						<Searchbar getSearchTerm={this.filterWithSearchTerm} />
						<Cities cities={cities} />	
						<AddItinerary />
					</Fragment> 
				)}
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cities: state.cities
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCities: (cities) => dispatch(getCities(cities)),
		filterCities: (searchTerm) => dispatch(filterCities(searchTerm))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItinerariesP);