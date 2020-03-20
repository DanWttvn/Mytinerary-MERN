import React, { Component } from 'react'
import { connect } from "react-redux"
import { getActivities } from "../store/actions/itineraryActions"
import { getItinerary, getComments, addComment } from "../store/actions/itineraryActions"
import Navbar from "../components/UI_Components/Navbar"
import Activities from "../components/display_Components/Activities"
import ExtraInfoIcons from "../components/UI_Components/ExtraInfoIcons"


class ActivitiesPage extends Component {

	componentDidMount() {
		const itinID = this.props.match.params.itinID; //this comes from the route: :itin. that's the itinId
		console.log(itinID);
		this.props.getItinerary(itinID);
		this.props.getActivities(itinID);	
		this.props.getComments(itinID);
	}

	handleClick = (e) => {
		const itinID = this.props.match.params.itinID;
		const newComment = "cambiar por el input"
		this.props.addComment(itinID, newComment);
	}

	render () {
		const allComments = this.props.comments.map((comment, i) => {
			return (
				<div className="commentBox">
					<p>{comment.content}</p>
					<p>Posted by: {comment.userID}</p>
				</div>
			)
		})

		
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
					{/* COMMENTS */}
					{/* <Comments comments={this.props.comments}/> */}
					<div className="allCommentsBox">
						{allComments}
					</div>
				</div>

				


				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		itinerary: state.itineraries.itinerary, //nombre del reducer
		activities: state.itineraries.activities,
		comments: state.itineraries.comments
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getActivities: (itinID) => dispatch(getActivities(itinID)),
		getItinerary: (itinID) => dispatch(getItinerary(itinID)),
		getComments: (itinID) => dispatch(getComments(itinID)),
		addComment: (newComment) => dispatch(addComment(newComment))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);