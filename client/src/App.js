import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import LandingPage from "./components/LandingPage";
import CitiesPage from "./views/CitiesPage"
import ProfilePage from "./views/ProfilePage"
import FavoritesPage from "./views/FavoritesPage"
import CityPage from "./views/CityPage"
import LandingPage from "./views/LandingPage"
import SignInPage from "./views/SignInPage"
import SignUpPage from "./views/SignUpPage"
// import { loadUser } from './store/actions/authActions';

class App extends Component {

	// çççççç LO AÑADE TRAVERSY AQUI, PERO AQUI NO TENGO LA STORE Y EN INDEX.JS NNO TENGO COMPONENT
	// componentDidMount() {
	// 	store.dispatch(loadUser());
	// }

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					{/* <h1>My itinerary</h1> cambiar por logo */}
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route path="/sign_in" component={SignInPage} />
						<Route path="/sign_up" component={SignUpPage} />
						<Route exact path="/cities" component={CitiesPage} />
						<Route exact path="/cities/all" component={CitiesPage} />
						<Route path="/cities/:city" component={CityPage} /> {/* el :city es el this.props.match.*/}
						<Route exact path="/profile" component={ProfilePage} />
						<Route exact path="/favorites" component={FavoritesPage} />
						{/* <Route path="/welcome" component={Welcomepage}></Route> */}
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
