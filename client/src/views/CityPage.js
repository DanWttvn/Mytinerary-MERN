import React, { Component } from 'react'
import { connect } from "react-redux"
// import { getAllItineraries } from "../store/actions/itineraryActions"
import { getItinerariesByCity } from "../store/actions/itineraryActions"
import Navbar from "../components/UI_Components/Navbar"
import Logo from "../components/UI_Components/Logo"
import Itineraries from "../components/display_Components/Itineraries"

class CityPage extends Component {

	componentDidMount() {
		// this.props.getAllItineraries()
		// console.log(this.props.getAllItineraries);	
		this.props.getItinerariesByCity(this.props.match.params.city) //this comes from the route: :city. that's the city
	}

	render () {
		// console.log(this.props.match.params.city);
		return (
			<div className="container">
				<Logo/>
				<h3 className="cityName">{this.props.match.params.city}</h3>
				<Itineraries itineraries={this.props.itineraries}/>
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		itineraries: state.itineraries.itineraries //nombre del reducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// getAllItineraries: () => dispatch(getAllItineraries())
		getItinerariesByCity: (city) => dispatch(getItinerariesByCity(city))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CityPage);