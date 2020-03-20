import React, { Component } from 'react'
import { connect } from "react-redux"
import { getActivities } from "../store/actions/itineraryActions"
import { getItinerary } from "../store/actions/itineraryActions"

import Navbar from "../components/UI_Components/Navbar"
import Activities from "../components/display_Components/Activities"
import ExtraInfoIcons from "../components/UI_Components/ExtraInfoIcons"


class ActivitiesPage extends Component {

	componentDidMount() {
		const itinID = this.props.match.params.itinID; //this comes from the route: :itin. that's the itinId
		console.log(itinID);
		this.props.getItinerary(itinID);
		this.props.getActivities(itinID); 		
	}

	render () {	
		
		return (
			<div className="containerB">
				{ this.props.activities.length ?
					<Activities activities={this.props.activities}/>
					: <img className="itineraryImg" src={this.props.itinerary.img} alt="activity"/>
				}
					
				<ExtraInfoIcons itin={this.props.itinerary}/>
				<div className="container">
					<h6 className="itinTitle">{this.props.itinerary.title}</h6>
					<p className="summary">{this.props.itinerary.summary}</p>
				</div>

				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		itinerary: state.itineraries.itinerary, //nombre del reducer
		activities: state.itineraries.activities
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getActivities: (itinID) => dispatch(getActivities(itinID)),
		getItinerary: (itinID) => dispatch(getItinerary(itinID))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);