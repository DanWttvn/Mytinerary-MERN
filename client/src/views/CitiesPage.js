import React, { Component } from "react"
// import {NavLink} from "react-router-dom"
import Logo from "../components/Logo"
import Navbar from "../components/Navbar"
import Searchbar from "../components/Searchbar"
import Cities from "../components/Cities"


class CitiesPage extends Component {
	state = {
		cities : [],
		filteredCities : []
	}

	componentDidMount () {
		this.getData()
		console.log(this.state.cities)
	}

	getData = () => {
		this.setState({...this.state, isFetching: true})
		fetch("/cities/all")
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState({
					cities: data,
					filteredCities: data,
					isFetching: false
				})
			})
	}

	filterCities = (searchTerm) => {

		let filteredCities = this.state.cities;

		filteredCities = filteredCities.filter((city) => city.name.toLowerCase().startsWith(searchTerm));

		this.setState({
			filteredCities
		})

		console.log(this.state.filteredCities);
	}

	render() {

		return (
			<div id="CitiesPage" className="container">
				<Logo/>
				<h3>Where are you going?</h3>
				<Searchbar searchCity={this.filterCities} />
				<Cities cities={this.state.filteredCities} />		
				<Navbar/>
			</div>
		)
	}
}

export default CitiesPage;