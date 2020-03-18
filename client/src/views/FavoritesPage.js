import React, {Component} from "react"
import Navbar from "../components/Navbar"
import { connect } from "react-redux"


class FavoritesPage extends Component {

	render () {

		const favoritesGallery = this.props.user.favorites.map(itin => {		
			return (
				<div key={itin._id}>
					<p>{itin}</p>
				</div>
			)
		})

		return (
			<div id="FavoritesPage">
				<h3>FavoritesPage</h3>
				{favoritesGallery}
				<p>hsf</p>
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// deleteFav: (newUser) => dispatch(deleteFav(newUser)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
