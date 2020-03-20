import React, { Component } from 'react'
import { connect } from "react-redux"
// import { getActivitiesByItinerary } from "../store/actions/activitiesActions"
import { getItinerary } from "../store/actions/itineraryActions"

import Navbar from "../components/UI_Components/Navbar"
import Logo from "../components/UI_Components/Logo"
// import Activities from "../components/display_Components/Activities"



class ActivitiesPage extends Component {

	// GET ACTIVITIES BY ITINERARY SERA BUSCANDO POR EL ID Y NO EL TITULO!

	componentDidMount() {
		const itinID = this.props.match.params.itinID;
		// this.props.getActivitiesByItinerary(this.props.match.params.itinID) //this comes from the route: :itin. that's the itinId
		console.log(itinID);
		this.props.getItinerary(itinID)
	}

	render () {	
		
		return (
			<div className="container">
				<Logo/>
				<h3>Activities Page</h3>
				<h3 className="cityName">{this.props.itinerary.title}</h3>
				<p >{this.props.itinerary.summary}</p>
				{/* <Activities activities={this.props.activities}/> */}

				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		itinerary: state.itineraries.itinerary //nombre del reducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// getActivitiesByItinerary: (itinID) => dispatch(getActivitiesByItinerary(itinID))
		getItinerary: (itinID) => dispatch(getItinerary(itinID))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);