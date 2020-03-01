import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'


// const ExtraInfoIT = (props) => {
// 	return (
// 		<div className="extraInfoBox">
// 			<div className="extraInfo">
// 				<FontAwesomeIcon icon={faThumbsUp} className="faExtraInfo"/>
// 				<span>{props.like}</span>
// 			</div>
// 			<div className="extraInfo">
// 				<FontAwesomeIcon icon={faClock} className="faExtraInfo"/>
// 				<span>{props.duration}</span>
// 			</div>
// 			<div className="extraInfo">
				//mirar como repetir segun algo
// 				<FontAwesomeIcon icon={faDollarSign} className="faExtraInfo"/>
// 				<FontAwesomeIcon icon={faDollarSign} className="faExtraInfo"/>
// 			</div>
// 		</div>
// 	)
// }

const ExtraInfoIT = () => {
	return (
		<div className="extraInfoBox">
			<div className="extraInfoIconsBox">
				<div className="extraInfoIcon">
					<FontAwesomeIcon icon={faThumbsUp} className="faExtraInfo"/>
					<span>25</span>
				</div>
				<div className="extraInfoIcon">
					<FontAwesomeIcon icon={faClock} className="faExtraInfo"/>
					<span>2h</span>
				</div>
				<div className="extraInfoIcon">
					<FontAwesomeIcon icon={faDollarSign} className="faExtraInfo"/>
					<FontAwesomeIcon icon={faDollarSign} className="faExtraInfo"/>
				</div>
			</div>
			<span className="title">PASEO POR CANALES</span>
			<div className="hastagsBox">
				<span className="hastag">#history</span>
				<span className="hastag">#restaurants</span>
			</div>
		</div>
	)
}

export default ExtraInfoIT;


