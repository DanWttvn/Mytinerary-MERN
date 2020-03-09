import React, { Component } from 'react'
// import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux"
// import { getAllItineraries } from "../store/actions/itineraryActions"
import { getItinerariesByCity } from "../store/actions/itineraryActions"


import Navbar from "../components//Navbar"
import Logo from "../components//Logo"
import Itineraries from "../components//Itineraries"



class CityPage extends Component {

	// que me saque los nombres de la ciudad y segun eso display

	componentDidMount() {
		// this.props.getAllItineraries()
		// console.log(this.props.getAllItineraries);	
		
		this.props.getItinerariesByCity()
		
	}

	render () {
		return (
			<div className="container">
				<Logo/>
				<h3 className="cityName">Amsterdam</h3>

				{/* lo que le paso aqui que sean esas ciudades */}
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
		// getAllItineraries: (itineraries) => dispatch(getAllItineraries(itineraries))

		getItinerariesByCity: (itineraries) => dispatch(getItinerariesByCity(itineraries))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CityPage);