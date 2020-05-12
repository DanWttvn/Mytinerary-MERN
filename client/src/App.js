import React, { Component, Fragment } from 'react';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Alert from "./components/elements/Alert"
import LandingP from "./components/pages/LandingP"
import SignInP from "./components/pages/SignInP"
// import CitiesP from "./components/pages/CitiesP"
// import ProfileP from "./components/pages/ProfileP"
// import FavoritesP from "./components/pages/FavoritesP"
// import ItinerariesP from "./components/pages/ItinerariesP"
// import SignUpP from "./components/pages/SignUpP"
// import ActivitiesP from './components/pages/ActivitiesP';
import { loadUser } from './store/actions/auth';
import store from "./store/store"
import setAuthToken from "./store/utils/setAuthToken"



if(localStorage.token) {
	setAuthToken(localStorage.token)
}

class App extends Component {

	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Fragment>
						<Alert />
						<Switch>
							<Route exact path="/" component={LandingP} />
							{/* <Route exact path="/auth/:token" component={LandingP} /> */}
							<Route path="/sign_in" component={SignInP} />
							{/* <Route path="/sign_up" component={SignUpP} /> */}
							{/* <Route exact path="/cities" component={CitiesP} /> */}
							{/* <Route exact path="/cities/:city" component={ItinerariesP} /> */}
							{/* <Route exact path="/cities/:city/:itinID" component={ActivitiesP} />   cambiar a : //! (`/itineraries/${itin_id}`) ?? */}
							{/* <Route exact path="/profile" component={ProfileP}/>
							<Route exact path="/favorites" component={FavoritesP} /> */}
						</Switch>
					</Fragment>
					
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
