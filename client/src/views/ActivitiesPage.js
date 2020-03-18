import React, { Component } from 'react'
import { connect } from "react-redux"
import { getActivitiesByItinerary } from "../store/actions/activitiesActions"

import Navbar from "../components/Navbar"
import Logo from "../components/Logo"
import Activities from "../components/Activities"



class ActivitiesPage extends Component {


	componentDidMount() {
		// this.props.getAllItineraries()
		// console.log(this.props.getAllItineraries);	
		this.props.getActivitiesByItinerary(this.props.match.params.itin) //this comes from the route: :city. that's the city
	}

	render () {
		// console.log(this.props.itineraries);
		// // the city Im in
		// console.log(this.props.match.params.city);
		
		
		return (
			<div className="container">
				<Logo/>
				{/* <h3 className="cityName">{this.props.match.params.itin}</h3> */}
				{/* <Activities activities={this.props.activities}/> */}
				<h3>ACTIVITIE SPAGE</h3>
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		activities: state.activities.activities //nombre del reducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// getAllItineraries: () => dispatch(getAllItineraries())
		getActivitiesByItinerary: (itin) => dispatch(getActivitiesByItinerary(itin))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);