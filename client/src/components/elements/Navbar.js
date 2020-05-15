import React, {Component} from "react"
import { connect } from "react-redux"
import {NavLink} from "react-router-dom"
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


class Navbar extends Component {

	render() {
		const { isAuthenticated, user, loading } = this.props.auth;
		let avatar = ""
		if(!loading &&
			 isAuthenticated
			 	&& user.avatar ){
			avatar = user.avatar.startsWith("uploads") ? `/${user.avatar}` : user.avatar;
		}
		
		return (
			<nav id="navbar">

				{ isAuthenticated && user.avatar ?
					<div className="navbar-profile-box" >
						<NavLink to="/profile"><img src={avatar} alt="profile pic"/></NavLink>
					</div>
					: <div>
						  <NavLink to="/profile"><FontAwesomeIcon icon={faUser} className="fa-menu-icon faUserMenu"/></NavLink>
					  </div>
				}
				{/* <div>
					<NavLink to="/profile"><FontAwesomeIcon icon={faUser} className="fa-menu-icon faUserMenu"/></NavLink>
				</div> */}
				<div>
					<NavLink to="/cities"><FontAwesomeIcon icon={faSearch} className="fa-menu-icon"/></NavLink>
				</div>
				<div>
					<NavLink to="/favorites"><FontAwesomeIcon icon={faHeart} className="fa-menu-icon"/></NavLink>
				</div>

			</nav>
		)
	}
	
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, null)(Navbar);
