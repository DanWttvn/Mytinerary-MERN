import React, { Component } from 'react'
import { connect } from "react-redux"
import axios from "axios"
import { getActivities, getItinerary, getComments, addComment } from "../store/actions/itineraryActions"
import Navbar from "../components/UI_Components/Navbar"
import Activities from "../components/display_Components/Activities"
import ExtraInfoIcons from "../components/UI_Components/ExtraInfoIcons"
import BtnSignInInside from '../components/UI_Components/BtnSignInInside'
import Heart from "../components/UI_Components/Heart"


class ActivitiesPage extends Component {
	state = {
		newComment: "",
		allUsers: []
	}
	// como estoy modificando el state, se actualiza solo, sin un update de algo. puedo aplicar essto a update_itineraries y ahorrarmelo??

	componentDidMount() {
		const itinID = this.props.match.params.itinID; //this comes from the route: :itin. that's the itinId
		// console.log(itinID);
		this.props.getItinerary(itinID);
		this.props.getActivities(itinID);	
		this.props.getComments(itinID);

		axios.get("/user/all").then(res => {
			this.setState({
				allUsers: res.data
			})
		}) 		
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

		console.log(this.state.allUsers);

		// {/* --- COMMENTS --- */}

		let allComments = this.props.comments;
		console.log(allComments);
		
		// update comment with username
		allComments.map((comment) => {
			for (let i = 0; i < this.state.allUsers.length; i++) {
				if(this.state.allUsers[i]._id === comment.userID) {
					comment.username = this.state.allUsers[i].username
				}			
			}
			return comment
		})

		const commentsDisplay = allComments.map((comment, i) => {
			return (
				<div className="commentBox" key={i}>
					<p>{comment.content}</p>
					<p className="commentName">{comment.username}</p>
				</div>
			)
		})

		
		return (
			<div id="ActivitiesPage" className="containerB">

				{/* --- ACTIVITIES SECTION --- */}
				{ this.props.activities.length ?
					<Activities activities={this.props.activities}/>
					: <div className="activityCard">
						<img className="activitiesImg" src={this.props.itinerary.img} alt="activity"/>
					</div>
				}
	
				<ExtraInfoIcons itin={this.props.itinerary}/>

				{/* --- COMMENTS SECTION --- */}
				<div className="container">
					<div className="itinTitleBox">
						<h6 className="subtitlesT subtitle">{this.props.itinerary.title}</h6>
						<Heart itin={this.props.itinerary} />
					</div>

					<p className="paragraph">{this.props.itinerary.summary}</p>

					<div className="allCommentsBox">
						
						<p className="sectionTitle">Comments</p>

						{ this.props.isAuthenticated ? 
							<form onSubmit={this.submitComment} id="newCommentForm" className="addCommentBox">
								<textarea className="addCommentInput" id="addCommentInput" type="text" onChange={this.addCommentInput} onKeyDown={this.autosize} name="newComment" placeholder="Add comment..." required />
								<input className="sendCommentBtn" type="submit" name="submit" value=">" />
							</form>
						:   <div className="addCommentBox">
								<p>Sign in to add comments</p>
								<BtnSignInInside/>
							</div>	
						}

						{ commentsDisplay }
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