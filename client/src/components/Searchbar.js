import React, { Component } from "react"


class Searchbar extends Component {

	handleChange = (e) => {
		this.props.searchCity(e.target.value.toLowerCase()); 
		//como mando el searcchTerm?
		// searchCity es el nombre del props que le he puesto en city page, es decir, la funcion
	}
	
	render() {
		console.log(this.props);
		console.log(this.props.searchCity);
		
		return (
			<div id="searchbar" className="searchbar">
				<input type="text" onChange={this.handleChange} className="" placeholder="Search a city..."/>
			</div>	
		)	
	}
	
}

export default Searchbar;