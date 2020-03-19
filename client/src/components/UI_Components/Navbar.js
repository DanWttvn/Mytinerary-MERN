import React from "react"
import {NavLink} from "react-router-dom"
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Navbar = () => {
	return (
		<nav id="navbar">
			{/* <ul className="">
				<li><NavLink to="/profile">Profile</NavLink></li>
				<li><NavLink to="/cities">Cities</NavLink></li>
				<li><NavLink to="/favorites">Favorites</NavLink></li>		
			</ul> */}
			<div>
				<NavLink to="/profile"><FontAwesomeIcon icon={faUser} className="faMenuIcon faUserMenu"/></NavLink>
			</div>
			<div>
				<NavLink to="/cities"><FontAwesomeIcon icon={faSearch} className="faMenuIcon faSearch"/></NavLink>
			</div>
			<div>
				<NavLink to="/favorites"><FontAwesomeIcon icon={faHeart} className="faMenuIcon faHeartMenu"/></NavLink>
			</div>

		</nav>
	)
}

export default Navbar;
