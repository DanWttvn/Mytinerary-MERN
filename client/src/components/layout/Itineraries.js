import React, { Component } from 'react'
import { connect } from "react-redux"
import { updateFavorites } from "../../store/actions/auth"
import { Link } from "react-router-dom"
import ExtraInfoIcons from "./ExtraInfoIcons"
import AddItineraryModal from "./AddItinerary"
import Heart from "../elements/Heart"


class Itineraries extends Component {
	render () {
		const { user, isAuthenticated } = this.props.auth
		const isInFavsPage = this.props.inFavsPage

		// No itineraries message
		let noItinerariesMsg = isInFavsPage ? (
				<div className="btns-box3 center">
					<p>You still have no favorites!</p>
					<div className="btn-inside"><a href="/cities">Explore</a></div>
				</div>
			):( 
				<div className="btns-box3 center">
					<p>There are still no itineraries for this city</p>
					<br/>
					<AddItineraryModal /> 
				</div>
			)

		//todo: solucionar
		let areItins = true;
		if(isInFavsPage) {
			areItins = user.favorites.length > 0 ? true : false;
		} else {
			areItins = this.props.itineraries.length > 0 ? true : false
		}


		const itinsCarrousel = this.props.itineraries.map(itin => {
	
			let itinURL = isInFavsPage ? `/cities/${itin.city}/${itin._id}` : `${itin.city}/${itin._id}`;

			//* Change before deploy? a // const imgURL = "url(" + itin.img + ")"
			const imgURL = itin.img.startsWith("uploads") ? "url(/" + itin.img + ")" : "url(" + itin.img + ")"
			const imgURLDisplay = imgURL.replace(/\\/g, "/");

			const avatarURL = itin.avatar.startsWith("uploads") ? "http://localhost:5000/" + itin.avatar : itin.avatar
			const avatarURLDisplay = avatarURL.replace(/\\/g, "/");

			const hashtags = itin.hashtags.map((hashtag, i) => {
				return(
					<span className="hashtag" key={i}>#{hashtag}</span>
				)
			})

			return (				
				<div className="itin-box" key={itin._id}>
					<div className="itin-card">
						<Link to={itinURL}>

							<div className="user-avatar">
								<img src={avatarURLDisplay} alt=""/>
							</div>

							<div className="itin-img-prev" style={
								{backgroundImage: imgURLDisplay,
								backgroundPosition: 'center center', 
								backgroundSize: 'cover'}}>
							</div>

							<div className="itin-info-prev">
								<p className="shortened-summary">{itin.summary}</p>
								<div className="card-mascara"></div>
							</div>
						</Link>
						
						{ isAuthenticated ?
							<Heart inFavsPage={isInFavsPage} itin={itin} />
							: null
						}
								
					</div>	

					<div className="extra-info-box">
						<ExtraInfoIcons itin={itin}/>
						<span className="subtitles-font subtitle">{itin.title}</span>
						<div className="hashtags-box">
							{ hashtags }
						</div>
					</div>
				</div>
			)	
		})
	
		return (
			<div className="itins-carousel">
				{areItins ? (
					itinsCarrousel 
				):(
					noItinerariesMsg
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateFavorites: (itin_id) => dispatch(updateFavorites(itin_id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);