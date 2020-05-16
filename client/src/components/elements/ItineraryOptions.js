import React, { useState, Fragment } from 'react';
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'reactstrap';
import { deleteItinerary, addActivity, deleteActivity } from "../../store/actions/itinerary"

//* CAMBIAR CON STATE
//* dejar modal con hooks
const ItineraryOptions = ({ itinerary: { id, activities } }) => {

	//* when opt edit open modal
	const [modal, setModal] = useState(false);
	const [nestedModal, setNestedModal] = useState(false);

	const [closeAll, setCloseAll] = useState(false);

	const toggle = () => setModal(!modal);
	const toggleNested = () => {
		setNestedModal(!nestedModal);
		setCloseAll(false);
	}
	const toggleAll = () => {
		setNestedModal(!nestedModal);
		setCloseAll(true);
	}

	// handleAdd = () => {
	// 	toggleNested
	// 	addActivity(id, formData)
	// }

	return (
		<Fragment>
			{/* 3 puntitos */}
			<div className="itin-opt-box">
				{/* edit activity: open modal */}
				<button onClick={toggle} className="">Edit Activities</button>
				<button onClick={() => deleteItinerary(id)} className="">Delete Itinerary</button>
			</div>


			<Modal isOpen={modal} toggle={toggle}>

				{/* Add Activity  */}
				<button onClick={toggleNested}>Add Activity</button>
				<Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
					<h4>FOTM ADD ACT</h4>
					<Button onClick={() => this.handleAdd()}><FontAwesomeIcon icon={faTimes}/></Button>
					<Button onClick={toggleNested}><FontAwesomeIcon icon={faTimes}/></Button>
					{/* <Button onClick={toggleAll}>All Done</Button> */}
				</Modal>

				{/* Delete Activity  */}
				{activities.map(activity => {
					const imgURL = "url(" + activity.img + ")"
					const imgURLDisplay = imgURL.replace(/\\/g, "/"); 

					return (
						<div className="city-card" >
							<div className="thumbnail" style={
								{backgroundImage: imgURLDisplay, 
								backgroundPosition: 'center center', 
								backgroundSize: 'cover'}}></div>
							<p className="city-name-thumb">{activity.title}</p>
							<button onClick={() => deleteActivity(id, activity.id)} type="button" className=""><FontAwesomeIcon icon={faTimes}/></button>
						</div>
					)
				})}
			</Modal>
		</Fragment>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteItinerary: (itin_id) => dispatch(deleteItinerary(itin_id)),
		addActivity: (itin_id, formData) => dispatch(addActivity(itin_id, formData)),
		deleteActivity: (itin_id, activity_id) => dispatch(deleteActivity(itin_id, activity_id))
	}
}

export default connect(null, mapDispatchToProps)(ItineraryOptions);