import React, {Component} from "react"
import { connect } from "react-redux"
import {NavLink} from "react-router-dom"
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


class Navbar extends Component {

	render() {
		const { isAuthenticated, user } = this.props.auth;
		let profilePic = ""
		if(isAuthenticated){
			profilePic = user.profilePic.startsWith("uploads") ? `/api/${user.profilePic}` : user.profilePic;
		}
		
		return (
			<nav id="navbar">

				{ isAuthenticated && user.profilePic ?
					<div className="profileNavbarBox" >
						<NavLink to="/profile"><img src={profilePic} alt="profile pic"/></NavLink>
					</div>
					: <div>
						  <NavLink to="/profile"><FontAwesomeIcon icon={faUser} className="faMenuIcon faUserMenu"/></NavLink>
					  </div>
				}
				{/* <div>
					<NavLink to="/profile"><FontAwesomeIcon icon={faUser} className="faMenuIcon faUserMenu"/></NavLink>
				</div> */}
				<div>
					<NavLink to="/cities"><FontAwesomeIcon icon={faSearch} className="faMenuIcon faSearch"/></NavLink>
				</div>
				<div>
					<NavLink to="/favorites"><FontAwesomeIcon icon={faHeart} className="faMenuIcon faHeartMenu"/></NavLink>
				</div>

			</nav>
		)
	}
	
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, null)(Navbar);
