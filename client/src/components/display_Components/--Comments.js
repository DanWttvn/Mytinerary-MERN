import React, { Component } from 'react'
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { addToFavorites, getItinerariesByFavs } from "../../store/actions/authActions"
import { Link } from "react-router-dom"
import ExtraInfoIcons from "../UI_Components/ExtraInfoIcons"

///////////// NO USAR ?? /////////////////

class Itineraries extends Component {

// 	handleClick = async (itinID) => {
// 		// borrar comentarios y coger user y display
// 	}

// 	render () {
// 		const itinsCarrousel = this.props.itineraries.map((itin, i) => {
			
// 			return (
				
// 			)	
// 		})
	
// 		return (
// 			<div className="itinsCarrousel">
// 				{itinsCarrousel}
// 			</div>
// 		)
// 	}
// }

// const mapStateToProps = state => {
// 	return {
// 		user: state.auth.user
// 	}
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		addToFavorites: (itinID) => dispatch(addToFavorites(itinID)),
// 		getItinerariesByFavs: () => dispatch(getItinerariesByFavs())
// 	}
// }

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);