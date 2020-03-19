import React, {Component} from "react"
import Navbar from "../components/UI_Components/Navbar"
import { connect } from "react-redux"
import { getItinerariesByFavs } from "../store/actions/authActions"
// import Favorites from "../components/Favorites"
import Logo from "../components/UI_Components/Logo"
import Itineraries from "../components/display_Components/Itineraries"
import BtnSignInInside from "../components/UI_Components/BtnSignInInside"


class FavoritesPage extends Component {

	componentDidMount() {
		this.props.getItinerariesByFavs()
	}

	render () {
		return (
			<div id="FavoritesPage">
				<Logo/>
				<h3>FavoritesPage</h3>
				{ this.props.isAuthenticated ? 
					<div>
						{/* <Favorites favoriteItins={this.props.favItineraries}/> POR SI QUIERO OTRO FORMATO */}
						<Itineraries inFavsPage={"inFavsPage"} itineraries={this.props.favItineraries}/>
					</div>
					: <div>
						  <p>Log in para ver esto</p>
							<BtnSignInInside/>
					  </div>
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
