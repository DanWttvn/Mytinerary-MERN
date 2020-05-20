import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { updateFavorites } from "../../store/actions/auth"
import { Link } from "react-router-dom"
import ExtraInfoIcons from "./ExtraInfoIcons"
import AddItineraryModal from "./AddItinerary"
import Heart from "../elements/Heart"


class Itineraries extends Component {
	render () {
		const { user, isAuthenticated } = this.props.auth
		const loading = this.props.itineraries.loading
		const isInFavsPage = this.props.inFavsPage

		let areItins = false;
		if(isInFavsPage && user) {
					areItins = user.favorites.length > 0 ? true : false;
		} else if (this.props.itineraries) {
			areItins = this.props.itineraries.length > 0 ? true : false
		}
	
		return (
			<Fragment>
				{ !loading ? 
					<div className="itins-carousel">
						{ areItins ? this.props.itineraries.map(itin => {
							//todo: change everywhere
							//* img url background
							const imgURLDisplay = itin.img.startsWith("uploads") ? (`url(/${itin.img})`).replace(/\\/g, "/") : (`url(${itin.img})`).replace(/\\/g, "/")
							//* img url <img>
							const avatarURLDisplay = itin.avatar.startsWith("uploads") ? (`/${itin.avatar}`).replace(/\\/g, "/") : itin.avatar.replace(/\\/g, "/")
				
							return (				
								<div className="itin-box" key={itin._id}>
									<div className="itin-card">
										<Link to={`/cities/${itin.city}/${itin._id}`}>
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
											<Heart inFavsPage={isInFavsPage} itin={itin} /> : null }
									</div>	
				
									<div className="extra-info-box">
										<ExtraInfoIcons itin={itin}/>
										<span className="subtitles-font subtitle">{itin.title}</span>
										<div className="hashtags-box"> {itin.hashtags.map((hashtag, i) =>(
											<span className="hashtag" key={i}>#{hashtag}</span>))}
										</div>
									</div>
								</div>
							)	
						}):(
							// no itineraries message
							<div className="btns-box3 center">
								{ isInFavsPage ? (
									<Fragment>
										<p>You still have no favorites!</p>
										<div className="btn-inside"><a href="/cities">Explore</a></div>
									</Fragment>
								):(
									<Fragment>
										<p>There are still no itineraries for this city</p>
										<br/>
										<AddItineraryModal />
									</Fragment> 
								)}
							</div>
						)}
					</div> : null
				}
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		loading: state.itineraries.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateFavorites: (itin_id) => dispatch(updateFavorites(itin_id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);