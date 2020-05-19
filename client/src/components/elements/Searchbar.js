import React, { Component } from "react"


class Searchbar extends Component {

	handleSearchTerm = (e) => {
		let searchTerm = e.target.value.toLowerCase(); 
		this.props.getSearchTerm(searchTerm); //sending searchter to  paernt
	}
	
	render() {
		return (
			<div id="searchbar" className="searchbar">
				<input type="text" onChange={this.handleSearchTerm} placeholder="Search a city..."/>
			</div>	
		)	
	}
}

export default Searchbar;