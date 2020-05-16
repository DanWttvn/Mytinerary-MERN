import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'


class ExtraInfoIcons extends Component {

	render() {
		const itin = this.props.itin

		return (
			<div className="extra-info-icons-box">
				<div className="extra-info-icon">
					<FontAwesomeIcon icon={faThumbsUp} className="faExtraInfo"/>
					<span>{itin.likes.length}</span>
				</div>
				<div className="extra-info-icon">
					<FontAwesomeIcon icon={faClock} className="faExtraInfo"/>
					<span> {itin.duration}</span>
				</div>
				<div className="extra-info-icon">
					<span>{itin.price}</span>
				</div>
			</div>
		)
	}
}
	


export default ExtraInfoIcons