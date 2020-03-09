import React, { Component } from 'react'
// import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux"
import { getAllItineraries } from "../store/actions/itineraryActions"

import thumbPrueba from "../img/amsterdam/a (1).jpg"
import Navbar from "../components//Navbar"
import Logo from "../components//Logo"
import ExtraInfoIT from "../components//ExtraInfoIT"
import Itineraries from "../components//Itineraries"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'


// import HeartIcon from "./HeartIcon"


class CityPage extends Component {

	// que me saque los nombres de la ciudad y segun eso display

	componentDidMount() {
		this.props.getAllItineraries()
		// console.log(this.props.getAllItineraries);		
	}

	// PARA LOS DATOS DE ESA CIUDAD 

	// const Users = ({ city }) => (
	// 	<Switch>
	// 		<Route exact path={`${city.url}`} component={AllUsers} />
	// 		<Route path={`${city.url}/:id`} component={Profile} />
	// 	</Switch>
	// );

	


	// return (
	// 	<div className="container">
	// 		<Navbar/>
	// 		<h3>{CityPage.name}</h3>
	// 		{itinsCarrousel}
	// 	</div>
	// )

	render () {
		return (
			<div className="container">
				<Logo/>
				{/* <h3 className="cityName">Amsterdam</h3>

				<div className="itinsCarrousel"> */}
			{/* MAS CARROUSEL, NO SCROLL, QUE SOBRESALGA ALGO PERO SE QUEDE PILLADO */}
					{/* <div className="itinCard">
						<div className="itinPrev" style={{backgroundImage: 'url(\'' + thumbPrueba + '\')', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
							<FontAwesomeIcon icon={farHeart} className="faHeart farHeart"/>
							<FontAwesomeIcon hidden icon={fasHeart} className="faHeart fasHeart"/>
							<div className="itinInfoPrev">
								<p className="title">Amsterdam</p>
								<p className="">Lorem ipsum dolor sitamet cotur adipisicing elit y algo mas.</p>
							</div>		
						</div>
						<ExtraInfoIT/>
					</div>		 */}
				{/* </div> */}

				<Itineraries/>

				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		itineraries: state.itineraries.itineraries //nombre del reducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllItineraries: (itineraries) => dispatch(getAllItineraries(itineraries))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CityPage);