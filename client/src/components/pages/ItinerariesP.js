import React, { Component, Fragment } from "react"
import Spinner from "../elements/Spinner"
import { connect } from "react-redux"
import { getItinerariesByCity } from "../../store/actions/itinerary"
import Navbar from "../elements/Navbar"
import Logo from "../elements/Logo"
import Itineraries from "../layout/Itineraries"

class ItinerariesP extends Component {

	componentDidMount() {	
		this.props.getItinerariesByCity(this.props.match.params.city)
	}

	render () {
		const { itineraries, loading } = this.props.itineraries

		return (
			<div id="ItinerariesP" className="containerB">
				<Logo/>
				{loading ? (
					<Spinner/>
				):(
					<Fragment>
						<p className="titles-font title-main container-padding">{this.props.match.params.city}</p>
						<Itineraries itineraries={itineraries}/>
					</Fragment> 
				)}
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		itineraries: state.itineraries
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getItinerariesByCity: (city) => dispatch(getItinerariesByCity(city))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItinerariesP);