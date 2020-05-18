import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'


class Activities extends Component {
	state = {
		sliderIndex: 0,
		numEvents: 1
	}

	componentDidMount() {
		const numEvents = this.props.activities.length
		this.setState({
			numEvents
		})
	}
	
	switchEvent(dir) {
		let sliderIndex = this.state.sliderIndex

		if(dir === "next" && sliderIndex === this.setState.numEvents - 1) {
			sliderIndex = 0;
		} else if (dir === "prev" && sliderIndex === 0) {
			sliderIndex = this.state.numEvents - 1
		} else if (dir === "next") { sliderIndex++ } else { sliderIndex-- }

		this.setState({ sliderIndex })

		const activitiesCarrousel = document.querySelector(".activities-carousel")
		
		let leftDistance = - sliderIndex * 100;
		activitiesCarrousel.style.transform = "translateX(" + leftDistance + "%)";
	}

	render () {
		const activitiesCards = this.props.activities.map((activity, i) => {

			//? Change before deploy? a // const imgURL = "url(" + activity.img + ")"
			const imgURL = activity.img.startsWith("uploads") ? "/" + activity.img : activity.img
			const imgURLDisplay = imgURL.replace(/\\/g, "/");

			return (
				<div className="activity-card" key={i}>
					<img className="activities-img" src={imgURLDisplay} alt="activity" key={i}/>
					<span className="activity-title">{activity.title}</span>
				</div>
			)
		})
		
		return (
			<Fragment>
				<div className="activities-carousel">
					{activitiesCards}
				</div>
				<div onClick={() => this.switchEvent("prev")} className="carousel-control prev"><FontAwesomeIcon icon={faChevronLeft}/></div>
				<div onClick={() => this.switchEvent("next")} className="carousel-control next"><FontAwesomeIcon icon={faChevronRight}/></div>
			</Fragment>
		)
	}
}

export default Activities;