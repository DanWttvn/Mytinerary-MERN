import React, { Component } from 'react'
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { updateFavorites } from "../../store/actions/auth"
import { updateLikes } from "../../store/actions/itinerary"



class Heart extends Component {

	updateFavorites = (itin_id) => {
		this.props.updateFavorites(itin_id); //user
		this.props.updateLikes(itin_id); //itin

		//? solo si esta in FavsPage, update displaye itineraries. se  lo paso desde FavoritesP. manualmente volvia a buscarlos, pero deberia actualizarse al actualizarse el reducer
		// if (this.props.inFavsPage) {
		// 	// refresh favorites page
		// 	this.props.getItinerariesByFavs()
		// }
	}


	render () {
		const itin = this.props.itin //from parent
		const user = this.props.user

		let isFavorite= false
		if(user) {
			user.favorites.forEach(fav => {
				if(fav.itinerary === itin._id) { 
					isFavorite = true
				}
			})
		}		

		return (
			<div className="faHeart">
				{ isFavorite ? (
					<FontAwesomeIcon icon={fasHeart} onClick={()=>{this.updateFavorites(itin._id)}} className="fas-heart"/>
				):(
					<FontAwesomeIcon icon={farHeart} onClick={()=>{this.updateFavorites(itin._id)}} className="far-heart"/>)
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
		updateFavorites: (itin_id) => dispatch(updateFavorites(itin_id)),
		updateLikes: (itin_id) => dispatch(updateLikes(itin_id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Heart);