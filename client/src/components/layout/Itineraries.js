import React, { Component } from 'react'
import { connect } from "react-redux"
import { updateFavorites } from "../../store/actions/auth"
import { Link } from "react-router-dom"
import ExtraInfoIcons from "./ExtraInfoIcons"
import AddItineraryModal from "./AddItinerary"
import Heart from "../elements/Heart"


class Itineraries extends Component {
	render () {
		const { 
			user, //para inFavsPage
			isAuthenticated } = this.props.auth
		const isInFavsPage = this.props.inFavsPage


		// No itineraries message
		let noItinerariesMsg = isInFavsPage ? (
				<div className="btnsBox3 center">
					<p>You still have no favorites!</p>
					<div className="btnInside"><a href="/cities">Explore</a></div>
				</div>
			):( 
				<div className="btnsBox3 center">
					<p>There are still no itineraries for this city</p>
					<br/>
					<AddItineraryModal /> 
				</div>
			)

		//todo: solucionar
		let areItins = true;
		// if(isInFavsPage) {
		// 	areItins = user.favorites[0] ? true : false;
		// } else {
		// 	areItins = this.props.itineraries[0] ? true : false
		// }


		const itinsCarrousel = this.props.itineraries.map(itin => {
	
			let itinURL = isInFavsPage ? `/cities/${itin.city}/${itin._id}` : `${itin.city}/${itin._id}`;

			//* Change before deploy? a // const imgURL = "url(" + itin.img + ")"
			const imgURL = itin.img.startsWith("uploads") ? "url(http://localhost:5000/" + itin.img + ")" : "url(" + itin.img + ")"
			const imgURLDisplay = imgURL.replace(/\\/g, "/");  // the \ gives me an error, so i have to change it to /

			const avatarURL = itin.avatar.startsWith("uploads") ? "http://localhost:5000/" + itin.avatar : itin.avatar
			const avatarURLDisplay = avatarURL.replace(/\\/g, "/");

			const hashtags = itin.hashtags.map((hashtag, i) => {
				return(
					<span className="hashtag" key={i}>#{hashtag}</span>
				)
			})

			return (				
				<div className="itinBox" key={itin._id}>
					<div className="itinCard">
						<Link to={itinURL}>

							<div className="user-avatar" 
							// style={
							// 	{backgroundImage: avatarURLDisplay,
							// 	backgroundPosition: 'center center', 
							// 	backgroundSize: 'cover'}}
							>
								<img src={avatarURLDisplay} alt=""/>
							</div>

							<div className="itinImgPrev" style={
								{backgroundImage: imgURLDisplay,
								backgroundPosition: 'center center', 
								backgroundSize: 'cover'}}>
							</div>

							<div className="itinInfoPrev">
								<p className="shortenedSummary">{itin.summary}</p>
								<div className="mascaraCard"></div>
							</div>
						</Link>
						
						{ isAuthenticated ?
							<Heart inFavsPage={isInFavsPage} itin={itin} />
							: null
						}
								
					</div>	

					<div className="extraInfoBox">
						<ExtraInfoIcons itin={itin}/>
						<span className="subtitlesT subtitle">{itin.title}</span>
						<div className="hashtagsBox">
							{ hashtags }
						</div>
					</div>
				</div>
			)	
		})
	
		return (
			<div className="itinsCarrousel">
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