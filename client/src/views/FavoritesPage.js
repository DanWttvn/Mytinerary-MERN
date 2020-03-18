import React, {Component} from "react"
import Navbar from "../components/Navbar"
import { connect } from "react-redux"
import { getItinerariesByFavs } from "../store/actions/authActions"
import Favorites from "../components/Favorites"
import Itineraries from "../components/Itineraries"


class FavoritesPage extends Component {

	componentDidMount() {
		this.props.getItinerariesByFavs()
	}

	render () {
		// console.log(this.props.user);
		
		if (this.props.isAuthenticated) {
			console.log("lo que estoy pasando al Componente:", this.props.favItineraries);
			// const favoritesGallery = this.props.user.favorites.map((itin, i) => {		
			// 	return (
			// 		<div key={i}>
			// 			<p>{itin}</p>
			// 		</div>
			// 	)
			// })
			// console.log(favoritesGallery);
		}


		return (
			<div id="FavoritesPage">
				<h3>FavoritesPage</h3>
				{ this.props.isAuthenticated 
					? 
						<div>
							{/* { favoritesGallery } */}
							<Favorites favoriteItins={this.props.favItineraries}/>
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
		// cada vez que loadUser recarga, carga ya todos los datos del user.favorites, pero SOLO LOS TITULOS, no me vale!
		// lo que yo quiero es el resultardo del getItinsByFav, que NO VOY A TENER EN LA STORE
		// user: state.auth.user,
		isAuthenticated: state.auth.isAuthenticated,
		favItineraries: state.itineraries.itineraries
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getItinerariesByFavs: (city) => dispatch(getItinerariesByFavs(city))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
