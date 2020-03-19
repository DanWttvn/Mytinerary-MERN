import React, { Component } from 'react'
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { addToFavorites, getItinerariesByFavs } from "../store/actions/authActions"


// const Itineraries = ({itineraries}) => {
class Itineraries extends Component {

	// console.log(itineraries);
	handleClick = async (itinID) => {
		await this.props.addToFavorites(itinID);
		
		// solo si esta in FavsPage, update displaye itineraries
		if (this.props.inFavsPage) {
			// alert("in favs page")
			this.props.getItinerariesByFavs()
		}
	}
	
	render () {
			const itinsCarrousel = this.props.itineraries.map((itin, i) => {
		return (
			<div className="itinCard" key={i}>
				<div className="itinPrev" style={
					{backgroundImage: 'url(\'' + itin.img
					+ '\')', 
					backgroundPosition: 'center center', 
					backgroundSize: 'cover'}}>
						<FontAwesomeIcon onClick={()=>{this.handleClick(itin.title)}} icon={farHeart} className="faHeart farHeart"/>
						<FontAwesomeIcon hidden icon={fasHeart} className="faHeart fasHeart"/>
						<div className="itinInfoPrev">
							<p className="shortenedSummary">{itin.summary}</p>
						</div>
				</div>

				<div className="extraInfoBox">
					<div className="extraInfoIconsBox">
						<div className="extraInfoIcon">
							<FontAwesomeIcon icon={faThumbsUp} className="faExtraInfo"/>
							<span>25</span>
						</div>
						<div className="extraInfoIcon">
							<FontAwesomeIcon icon={faClock} className="faExtraInfo"/>
							<span> {itin.duration}</span>
						</div>
						<div className="extraInfoIcon">
							<span>{itin.price}</span>
							{/* <FontAwesomeIcon icon={faDollarSign} className="faExtraInfo"/>
							<FontAwesomeIcon icon={faDollarSign} className="faExtraInfo"/> */}
						</div>
					</div>
					<span className="title">{itin.title}</span>

					<div className="hastagsBox">
						<span className="hastag">#history</span>
						<span className="hastag">#restaurants</span>
					</div>
				</div>

			</div>
		)
	})
	
	return (
			<div className="itinsCarrousel">
				{itinsCarrousel}
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToFavorites: (itinID) => dispatch(addToFavorites(itinID)),
		getItinerariesByFavs: () => dispatch(getItinerariesByFavs())
	}
}

export default connect(null, mapDispatchToProps)(Itineraries);