import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

const ExtraInfoIcons = ({itin}) => {
	return (
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
				</div>
			</div>
	)
}

export default ExtraInfoIcons