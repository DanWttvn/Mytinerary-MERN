import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { getItinerary, addComment } from "../../store/actions/itinerary"
import Navbar from "../elements/Navbar"
import Activities from "../layout/Activities"
import ExtraInfoIcons from "../layout/ExtraInfoIcons"
import Heart from "../elements/Heart"
import Spinner from '../elements/Spinner'
import CommentForm from '../elements/CommentForm'
import CommentItem from '../elements/CommentItem'


class ActivitiesP extends Component {

	componentDidMount() {
		const itin_id = this.props.match.params.itin_id; //this comes from the route: :itin. that's the itin_id
		this.props.getItinerary(itin_id);
	}

	render () {
		const { itinerary, loading } = this.props.itineraries
		
		//* Change before deploy? a // const imgURL = itin.img		
		let imgURL = ""
		if(!loading && 
				itinerary &&
					itinerary.img.startsWith("uploads")) {
			imgURL = `http://localhost:5000/${itinerary.img}`
		} else if (!loading) {
			imgURL = itinerary.img
		}		
		const imgURLDisplay = imgURL.replace(/\\/g, "/");
		

		return (
			<div id="ActivitiesP" className="containerB">
				{ loading ? (
					<Spinner/>
				):(
					<Fragment>
						{ itinerary.activities.length !== 0 ? (
							<Activities activities={itinerary.activities}/>
						):(
							<div className="activity-card">
								<img className="activities-img" src={imgURLDisplay} alt="activity"/>
							</div>
						)}
			
						<ExtraInfoIcons itin={itinerary}/>

						<div className="container">
							<div className="itin-title-box">
								<h6 className="subtitles-font subtitle">{itinerary.title}</h6>
								{ this.props.isAuthenticated ?
									<Heart itin={itinerary} />
									: null
								}
							</div>
	
							<p className="paragraph">{itinerary.summary}</p>

							<div className="comments-section">
								<CommentForm itin_id={itinerary._id} />
								{itinerary.comments.map(comment => (
									<CommentItem key={comment._id} comment={comment} itin_id={itinerary.id} />
								))}
							</div>
						</div>
					</Fragment>
				)}

				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		itineraries: state.itineraries,
		isAuthenticated: state.auth.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getItinerary: (itin_id) => dispatch(getItinerary(itin_id)),
		addComment: (itin_id, newComment) => dispatch(addComment(itin_id, newComment))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesP);