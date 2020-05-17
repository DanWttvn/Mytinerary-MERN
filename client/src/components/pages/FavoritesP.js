import React, {Component, Fragment} from "react"
import Navbar from "../elements/Navbar"
import { connect } from "react-redux"
import { getFavorites } from "../../store/actions/itinerary"
import Logo from "../elements/Logo"
import Itineraries from "../layout/Itineraries"
import SignInBtn from "../elements/SignInBtn"
import Spinner from "../elements/Spinner"


class FavoritesP extends Component {

	componentDidMount() {
		this.props.getFavorites()
	}

	render () {
		const { itineraries, loading } = this.props.itineraries

		return (
			<Fragment>
				<Logo/>
				<div id="FavoritesP" className="containerB">
					<p className="titles-font title-main container-padding">My favorites</p>

					{loading ? (
						<Spinner/>
					):(
						<Fragment>			
							{ this.props.isAuthenticated ? (
								<Itineraries inFavsPage={"inFavsPage"} itineraries={itineraries}/>
							):(
								<SignInBtn/>
							)}
						</Fragment>
					)}
				</div>
				<Navbar/>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		itineraries: state.itineraries
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getFavorites: () => dispatch(getFavorites())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesP);
