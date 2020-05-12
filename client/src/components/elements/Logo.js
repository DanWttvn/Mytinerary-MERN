import React from "react"
import {NavLink} from "react-router-dom"


const Logo = () => {
	return (
		<nav id="logo" className="logo">
			<h1><NavLink to="/cities">Mytinerary</NavLink></h1>
		</nav>
	)
}

export default Logo;
