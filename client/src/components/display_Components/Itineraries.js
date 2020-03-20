import React, { Component } from 'react'
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { addToFavorites, getItinerariesByFavs } from "../../store/actions/authActions"
import { Link } from "react-router-dom"
import ExtraInfoIcons from "../UI_Components/ExtraInfoIcons"


class Itineraries extends Component {

	handleClick = async (itinID) => {
		await this.props.addToFavorites(itinID);
		// solo si esta in FavsPage, update displaye itineraries
		if (this.props.inFavsPage) {
			// refresh favorites page
			this.props.getItinerariesByFavs()
		}
	}

	render () {
		const itinsCarrousel = this.props.itineraries.map((itin, i) => {

			let isFavorite;
			// if logged in
			if(this.props.user) {
				if (this.props.user.favorites.indexOf(itin._id) !== -1) {
					isFavorite = true
				} else {
					isFavorite = false
				}
			}

			return (
				// lilnk to $city.name/$itinID
				// ! ççç link deberia ser sobre fondo, porque al pinchar el corazon problema
				<Link to={`${itin.city}/${itin._id}`} key={itin._id}>
					<div className="itinCard">
						<div className="itinPrev" style={
							{backgroundImage: 'url(\'' + itin.img
							+ '\')', 
							backgroundPosition: 'center center', 
							backgroundSize: 'cover'}}>
								{ isFavorite ?
									<FontAwesomeIcon icon={fasHeart} onClick={()=>{this.handleClick(itin._id)}} className="faHeart fasHeart"/>
									: <FontAwesomeIcon icon={farHeart} onClick={()=>{this.handleClick(itin._id)}} className="faHeart farHeart"/>
								}
								<div className="itinInfoPrev">
									<p className="shortenedSummary">{itin.summary}</p>
								</div>
						</div>


						<div className="extraInfoBox">
							{/* <div className="extraInfoIconsBox">
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
							</div> */}
							<ExtraInfoIcons itin={itin}/>
							<span className="itinTitle">{itin.title}</span>
							<div className="hastagsBox">
								<span className="hastag">#history</span>
								<span className="hastag">#restaurants</span>
							</div>
						</div>

					</div>
				</Link>
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
		user: state.auth.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToFavorites: (itinID) => dispatch(addToFavorites(itinID)),
		getItinerariesByFavs: () => dispatch(getItinerariesByFavs())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);