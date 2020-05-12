import React, { Component } from 'react'
import { connect } from "react-redux"
// import { getItinerariesByCity } from "../../store/actions/itinerary"
import Navbar from "../UI_Components/Navbar"
import Logo from "../UI_Components/Logo"
import Itineraries from "../display_Components/Itineraries"

class ItinerariesP extends Component {

	componentDidMount() {
		// this.props.getAllItineraries()
		// console.log(this.props.getAllItineraries);	
		// console.log(this.props.match.params.city);
		
		this.props.getItinerariesByCity(this.props.match.params.city) //this comes from the route: :city. that's the city
		// ççç cambiar metodo traversy
		setTimeout(() => {document.getElementById("ItinerariesP").removeAttribute("hidden")}, 1000)
		
	}

	render () {
		// console.log(this.props.match.params.city);
		return (
			<div hidden id="ItinerariesP" className="containerB">
				<Logo/>
				<p className="titlesT mainTitle containerPadding">{this.props.match.params.city}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItinerariesP);