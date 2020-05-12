import React, { Component } from 'react'
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
// import { addToFavorites, getItinerariesByFavs } from "../../store/actions/auth"



class Heart extends Component {

	updateFavorites = async (itinID) => {
		await this.props.addToFavorites(itinID);
	
		// ççç solo si esta in FavsPage, update displaye itineraries. se  lo paso desde FavoritesP
		if (this.props.inFavsPage) {
			// refresh favorites page
			this.props.getItinerariesByFavs()
		}
	}


	render () {
		const itin = this.props.itin

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
			<div className="faHeart">
				{ isFavorite ?
					<FontAwesomeIcon icon={fasHeart} onClick={()=>{this.updateFavorites(itin._id)}} className="fasHeart"/>
					: <FontAwesomeIcon icon={farHeart} onClick={()=>{this.updateFavorites(itin._id)}} className="farHeart"/>
				}
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

export default connect(mapStateToProps, mapDispatchToProps)(Heart);