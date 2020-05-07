import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { connect } from "react-redux"
// import LandingPage from "./components/LandingPage";
import CitiesPage from "./views/CitiesPage"
import ProfilePage from "./views/ProfilePage"
import FavoritesPage from "./views/FavoritesPage"
import CityPage from "./views/CityPage"
import LandingPage from "./views/LandingPage"
import SignInPage from "./views/SignInPage"
import SignUpPage from "./views/SignUpPage"
import { loadUser } from './store/actions/authActions';
import store from "./store/store"
import ActivitiesPage from './views/ActivitiesPage';



class App extends Component {

	// CLAVE: a cada cambio va a comprobar si el user esta conectado
	componentDidMount() {
		store.dispatch(loadUser());
		console.log(this.props.isAuthenticated);
	}

	render() {
		return (
				<BrowserRouter>
					<div className="App">
						<Switch>

							{/* <Route exact path="/" component={LandingPage} /> */}
							<Route exact path="/" component={LandingPage} />
							<Route exact path="/auth/:token" component={LandingPage} />

							<Route path="/sign_in" component={SignInPage} />
							<Route path="/sign_up" component={SignUpPage} />
							<Route exact path="/cities" component={CitiesPage} />
							<Route exact path="/cities/:city" component={CityPage} /> {/* el :city es el this.props.match.*/}
							<Route exact path="/cities/:city/:itinID" component={ActivitiesPage} />  {/* cambiar a : //! (`/itineraries/${itin_id}`) ?? */}
							<Route exact path="/profile" component={ProfilePage}/>
							<Route exact path="/favorites" component={FavoritesPage} />
						</Switch>
					</div>
				</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}	
}

export default connect(mapStateToProps,null)(App);
