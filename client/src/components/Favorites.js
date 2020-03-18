import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'


const Favorites = ({favoriteItins}) => {

	// const ARRAYPRUEBA = [
	// 	"1",
	// 	"2",
	// 	"3"
	// ]
	// const MAP_PRUEBA = ARRAYPRUEBA.map((itin, i) => {
	// 	return (
	// 		<div>
	// 			<p>{itin}</p>
	// 		</div>
	// 	)	
	// })

	// console.log(favoriteItins);
	// const MAP_PRUEBA2 = favoriteItins.map((itin, i) => {
	// 	console.log(itin);
		
	// 	return (
	// 		<div>
	// 			<p>{itin}</p>
	// 		</div>
	// 	)	
	// })
	
	const itinsCarrousel = favoriteItins.map((itin, i) => {
		console.log(itin)
		return (
			// <p>{itin}</p>
			<div className="itinCard" key={i}>
				<div className="itinPrev" style={
					{backgroundImage: 'url(\'' + itin.img
					+ '\')', 
					backgroundPosition: 'center center', 
					backgroundSize: 'cover'}}>
						<FontAwesomeIcon icon={farHeart} className="faHeart farHeart"/>
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

			{/* {MAP_PRUEBA} */}
			{/* {MAP_PRUEBA2} */}
			
		</div>
	)
}

export default Favorites;