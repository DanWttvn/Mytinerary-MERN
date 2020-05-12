import React, { Component } from "react"
import { connect } from "react-redux"
// import { logout } from "../../store/actions/auth"
import PropTypes from "prop-types"

class NewAccount extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired
	}

	render() {
		return (
			<button className="btnInside" onClick={this.props.logout}>Log out</button>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: (currentUser) => dispatch(logout(currentUser))
	}
}

export default connect(null, mapDispatchToProps)(NewAccount);
