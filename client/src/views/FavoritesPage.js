import React, {Component} from "react"
import Navbar from "../components/Navbar"
import { connect } from "react-redux"
import { getItinerariesByFavs } from "../store/actions/authActions"
// import Favorites from "../components/Favorites"
import Itineraries from "../components/Itineraries"


class FavoritesPage extends Component {

	componentDidMount() {
		this.props.getItinerariesByFavs()
	}

	render () {
		return (
			<div id="FavoritesPage">
				<h3>FavoritesPage</h3>
				{ this.props.isAuthenticated 
					? 
						<div>
							{/* <Favorites favoriteItins={this.props.favItineraries}/> POR SI QUIERO OTRO FORMATO */}
							<Itineraries inFavsPage={"inFavsPage"} itineraries={this.props.favItineraries}/>
						</div>
					: 
						<p>Log in para ver esto</p>
				}
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		favItineraries: state.itineraries.itineraries
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getItinerariesByFavs: () => dispatch(getItinerariesByFavs())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
