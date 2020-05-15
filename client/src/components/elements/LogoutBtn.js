import React, { Component } from "react"
import { connect } from "react-redux"
import { logout } from "../../store/actions/auth"
import PropTypes from "prop-types"

class LogoutBtn extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired
	}

	render() {
		return (
			<button className="btn-inside" onClick={this.props.logout}>Log out</button>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logout())
	}
}

export default connect(null, mapDispatchToProps)(LogoutBtn);
