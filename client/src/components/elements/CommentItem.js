import React from 'react'
import Moment from "react-moment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux"
import { deleteComment } from "../../store/actions/itinerary"

const CommentItem = ({ itin_id, comment: {_id, content, username, avatar, user, date }, auth, deleteComment }) => {
	const avatarURL = avatar.startsWith("uploads") ? `http://localhost:5000/${avatar}` : avatar
	const avatarURLDisplay = avatarURL.replace(/\\/g, "/");
	const comment_id = _id

	return (
		<div className="comment-box" key={_id}>			
			<div>
				<img className="comment-avatar" src={avatarURLDisplay} alt=""/>
				<p className="comment-name">{username}</p>
			</div>
			<div>
				<p>{content}</p>
				<p className="comment-date">Posted on <Moment format="YYYY/MM/DD">{date}</Moment></p>
				{!auth.loading 
					&& auth.isAuthenticated
						&& user === auth.user.id && (
							<button onClick={() => deleteComment(itin_id, comment_id)} type="button" className="">
								<FontAwesomeIcon icon={faTimes}/>
							</button>
				)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)