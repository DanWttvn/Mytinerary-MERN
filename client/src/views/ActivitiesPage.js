import React, { Component } from 'react'
import { connect } from "react-redux"
import { getActivitiesByItinerary } from "../store/actions/activitiesActions"

import Navbar from "../components/UI_Components/Navbar"
import Logo from "../components/UI_Components/Logo"
import Activities from "../components/display_Components/Activities"



class ActivitiesPage extends Component {

	// GET ACTIVITIES BY ITINERARY SERA BUSCANDO POR EL ID Y NO EL TITULO!

	componentDidMount() {
		// this.props.getAllItineraries()
		// console.log(this.props.getAllItineraries);	
		this.props.getActivitiesByItinerary(this.props.match.params.itinID) //this comes from the route: :city. that's the city
		console.log(this.props.match.params);
		
	}

	render () {
		// console.log(this.props.itineraries);
		// // the city Im in
		// console.log(this.props.match.params.city);
		
		
		return (
			<div className="container">
				<Logo/>
				<h3>Activities Page</h3>
				<h3 className="cityName">{this.props.match.params.itinID}</h3>
				{/* <Activities activities={this.props.activities}/> */}
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		// activities: state.activities.activities //nombre del reducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// getAllItineraries: () => dispatch(getAllItineraries())
		getActivitiesByItinerary: (itin) => dispatch(getActivitiesByItinerary(itin))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);