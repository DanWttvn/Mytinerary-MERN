import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { logout } from "../../store/actions/auth"
import PropTypes from "prop-types"

class LogoutBtn extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired
	}

	render() {
		return (
			<button className="btn-inside" onClick={() => this.props.logout(this.props.history)}>Log out</button>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: (history) => dispatch(logout(history))
	}
}

export default connect(null, mapDispatchToProps)(withRouter(LogoutBtn));
