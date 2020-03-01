import React, { Component } from "react"


class Searchbar extends Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		searchTerm : ""
	// 	}
	// }

	handleChange = (e) => {
		// this.setState({
		// 	searchTerm : e.target.value.toLowerCase()
		// })
		this.props.searchCity(e.target.value.toLowerCase()); 
		//la funcion! luego lo que hago es traer aquí la función y pasar como arg el searchTerm		
	}
	
	render() {
		console.log(this.props);
		
		return (
			<div id="searchbar" className="searchbar">
					{/* <input type="text" onChange={this.sendSearchTerm}  className="" id="" placeholder="Search a city..."/> */}
				<input type="text" onChange={this.handleChange} className="" placeholder="Search a city..."/>
			</div>	
		)	
	}
	
}

export default Searchbar;