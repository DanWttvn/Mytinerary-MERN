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

			let isFavorite;
			if (this.props.favorites.indexOf(itin.title) !== -1) {
				// es favorito
				isFavorite = true
				// console.log(itin.title, isFavorite);
			} else {
				isFavorite = false
				// console.log(itin.title, isFavorite);

			}

			return (
				<div className="itinCard" key={i}>
					<div className="itinPrev" style={
						{backgroundImage: 'url(\'' + itin.img
						+ '\')', 
						backgroundPosition: 'center center', 
						backgroundSize: 'cover'}}>
							{ isFavorite ?
								<FontAwesomeIcon icon={fasHeart} onClick={()=>{this.handleClick(itin.title)}} className="faHeart fasHeart"/>
								: <FontAwesomeIcon icon={farHeart} onClick={()=>{this.handleClick(itin.title)}} className="faHeart farHeart"/>
							}
							
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

const mapStateToProps = state => {
	return {
		favorites: state.auth.user.favorites
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToFavorites: (itinID) => dispatch(addToFavorites(itinID)),
		getItinerariesByFavs: () => dispatch(getItinerariesByFavs())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);