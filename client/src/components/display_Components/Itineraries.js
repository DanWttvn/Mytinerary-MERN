import React, { Component } from 'react'
import { connect } from "react-redux"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
// import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { addToFavorites } from "../../store/actions/authActions"
import { Link } from "react-router-dom"
import ExtraInfoIcons from "../UI_Components/ExtraInfoIcons"

import Heart from "../UI_Components/Heart"


class Itineraries extends Component {

	render () {
		const isInFavsPage = this.props.inFavsPage

		const itinsCarrousel = this.props.itineraries.map(itin => {
			return (				
				<div className="itinBox" key={itin._id}>
					<div className="itinCard">
						<Link to={`cities/${itin.city}/${itin._id}`}>
							<div className="itinImgPrev" style={
								{backgroundImage: 'url(\'' + itin.img
								+ '\')', 
								backgroundPosition: 'center center', 
								backgroundSize: 'cover'}}>
							</div>
					
							{/* <div className="itinInfoPrev">
								<p className="shortenedSummary">{itin.summary}</p>
							</div> */}

							<div className="itinInfoPrev">
								<p className="shortenedSummary">{itin.summary}</p>
								<div className="mascaraCard"></div>

							</div>
						</Link>
					
						<Heart onClick={this.updateFavorites} inFavsPage={isInFavsPage} itin={itin} />		
					</div>	

					<div className="extraInfoBox">
						<ExtraInfoIcons itin={itin}/>
						<span className="subtitlesT subtitle">{itin.title}</span>
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
		user: state.auth.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToFavorites: (itinID) => dispatch(addToFavorites(itinID)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);