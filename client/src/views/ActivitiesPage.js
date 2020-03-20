import React, { Component } from 'react'
import { connect } from "react-redux"
import { getActivities, getItinerary, getComments, addComment } from "../store/actions/itineraryActions"
import Navbar from "../components/UI_Components/Navbar"
import Activities from "../components/display_Components/Activities"
import ExtraInfoIcons from "../components/UI_Components/ExtraInfoIcons"
import BtnSignInInside from '../components/UI_Components/BtnSignInInside'
import Heart from "../components/UI_Components/Heart"


class ActivitiesPage extends Component {
	state = {
		newComment: ""
	}
	// como estoy modificando el state, se actualiza solo, sin un update de algo. puedo aplicar essto a update_itineraries y ahorrarmelo??

	componentDidMount() {
		const itinID = this.props.match.params.itinID; //this comes from the route: :itin. that's the itinId
		console.log(itinID);
		this.props.getItinerary(itinID);
		this.props.getActivities(itinID);	
		this.props.getComments(itinID);
	}

	submitComment = (e) => {
		e.preventDefault();
		const newComment = this.state.newComment
		const itinID = this.props.match.params.itinID;
		this.props.addComment(itinID, newComment);
		// clear input form
		document.getElementById("newCommentForm").reset();
	}

	addCommentInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// auto-expand comment area
	autosize = (e) => {
		const textArea = document.getElementById("addCommentInput");
		setTimeout(function(){
			textArea.style.cssText = 'height:2.75em'; // con esto se vuelve a hacer mas pequeño
			textArea.style.cssText = 'height:' + textArea.scrollHeight + 'px';
		}, 0);
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
			<div id="ActivitiesPage" className="containerB">
				{ this.props.activities.length ?
					<Activities activities={this.props.activities}/>
					: <img className="itineraryImg" src={this.props.itinerary.img} alt="activity"/>
				}
	
				<ExtraInfoIcons itin={this.props.itinerary}/>


				<div className="container">
					<div className="itinTitleBox">
						<h6 className="itinTitle">{this.props.itinerary.title}</h6>
						<Heart itin={this.props.itinerary} />
					</div>

					<p className="summary">{this.props.itinerary.summary}</p>

					{/* COMMENTS */}
					{/* <Comments comments={this.props.comments}/> */}
					<div className="allCommentsBox">
						<p className="subtitle">Comments</p>

						{ this.props.isAuthenticated ? 
							<form onSubmit={this.submitComment} id="newCommentForm" className="addCommentBox">
								{/* <input className="addCommentInput" type="text" onChange={this.addCommentInput} name="newComment" placeholder="Add comment..." required />
								<input className="sendCommentBtn" type="submit" name="submit" value=">" /> */}

								<textarea className="addCommentInput" id="addCommentInput" type="text" onChange={this.addCommentInput} onKeyDown={this.autosize} name="newComment" placeholder="Add comment..." required />
								<input className="sendCommentBtn" type="submit" name="submit" value=">" />
							</form>
						:   <div className="addCommentBox">
								<p>Sign in to add comments</p>
								<BtnSignInInside/>
							</div>	
						}
						

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
		comments: state.itineraries.comments,
		isAuthenticated: state.auth.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getActivities: (itinID) => dispatch(getActivities(itinID)),
		getItinerary: (itinID) => dispatch(getItinerary(itinID)),
		getComments: (itinID) => dispatch(getComments(itinID)),
		addComment: (itinID, newComment) => dispatch(addComment(itinID, newComment))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);