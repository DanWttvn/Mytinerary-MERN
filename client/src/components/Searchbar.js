import React, { Component } from "react"


class Searchbar extends Component {
	// state = {
	// 	searchTerm: ""
	// }

	handleSearchTerm = (e) => {
		let searchTerm = e.target.value.toLowerCase(); 
		// console.log(searchTerm);
		
		this.props.getSearchTerm(searchTerm); //sending searchterm through getSearchTerm
	}
	
	render() {
		// console.log(this.props);
		// console.log(this.props.getSearchTerm);
		
		return (
			<div id="searchbar" className="searchbar">
				<input type="text" onChange={this.handleSearchTerm} placeholder="Search a city..."/>
			</div>	
		)	
	}
	
}

export default Searchbar;