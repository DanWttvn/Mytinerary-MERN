import React, { Component } from 'react'
import {
	Carousel,
	CarouselItem,
	CarouselControl
  } from 'reactstrap';

class Activities extends Component {
	state = {
		activeIndex: 0,
		animating: false
	}

	setActiveIndex = (activeIndex) => {
		this.setState({
			activeIndex
		})
	}
	setAnimating = (boolean) => {
		this.setState({
			animating: boolean
		})
	}
	
	next = () => {
		if (this.animating) return;
		const nextIndex = (this.state.activeIndex === (this.props.activities.length - 1)) ?
			0
			: this.state.activeIndex + 1
		this.setActiveIndex(nextIndex)			
	}

	previous = () => {
		if (this.animating) return;
		const nextIndex = (this.state.activeIndex === 0) ?
			this.props.activities.length - 1
			: this.state.activeIndex - 1
		this.setActiveIndex(nextIndex)			
	}

	render () {
		const activitiesCarrousel = this.props.activities.map((activity, i) => {
			return (
				<CarouselItem onExiting={() => this.setAnimating(true)} onExited={() => this.setAnimating(false)} key={i}>
					<div className="activity-card">
						<img className="activities-img" src={activity.img} alt="activity" key={i}/>
						<span className="activity-title">{activity.title}</span>
					</div>
				</CarouselItem>
			)
		})
		
		return (
			<Carousel activeIndex={this.state.activeIndex} 
			// next={this.next} previous={this.previous} to animate
			>
				{activitiesCarrousel}
				<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
				<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
			</Carousel>
		)
	}
}

export default Activities;