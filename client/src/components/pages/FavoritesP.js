import React, {Component} from "react"
import Navbar from "../UI_Components/Navbar"
import { connect } from "react-redux"
// import { getItinerariesByFavs } from "../../store/actions/auth"
import Logo from "../UI_Components/Logo"
import Itineraries from "../display_Components/Itineraries"
import SignInBtn from "../UI_Components/SignInBtn"


class FavoritesP extends Component {

	componentDidMount() {
		this.props.getItinerariesByFavs()
	}

	render () {		

		return (
			<div id="FavoritesP" className="">
				<Logo/>
				<p className="titlesT mainTitle containerPadding">My favorites</p>
				{ this.props.isAuthenticated ? 
					<div>
						<Itineraries inFavsPage={"inFavsPage"} itineraries={this.props.favItineraries}/>
					</div>
					: <SignInBtn/>
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


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesP);
