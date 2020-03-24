import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import axios from "axios"

// const ExtraInfoIcons = ({itin}) => {
class ExtraInfoIcons extends Component {

////////////////////////////////////////////////////////// NO FUNCIONA
// cambiar estrategia: cada vez que meto un favorito, tmb añado el id del user al itineraries.likes
	state = {
		allUsers: [],
		numLikes: 0
	}

	componentDidMount() {
		axios.get("/user/all").then(res => {
			this.setState({
				allUsers: res.data
			})
		}) 
		this.getLikes()
	}

	getLikes = () => {
		console.log("aaaaaaaaa");
		console.log(this.props.itin);
		
		const numLikes = this.state.numLikes
		for (let i = 0; i < this.state.allUsers.length; i++) {
			if (this.state.allUsers[i].favorites.indexOf(this.props.itin._id) !== -1) {
				++numLikes
				console.log("+1");
				
			}
			console.log(numLikes);
			
		}
		this.setState({
			numLikes
		})

	}
//////////////////////////////////////////////////////////


	render() {
		const itin = this.props.itin

		return (
			<div className="extraInfoIconsBox">
				<div className="extraInfoIcon">
					<FontAwesomeIcon icon={faThumbsUp} className="faExtraInfo"/>
					<span>{this.state.numLikes}</span>
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
}
	


export default ExtraInfoIcons