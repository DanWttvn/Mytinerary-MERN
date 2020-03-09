import React from 'react'
// import thumbPrueba from "../img/amsterdam/a (1).jpg"


const Itineraries = ({itineraries}) => {

	// console.log(itineraries);
	
	const itinsCarrousel = itineraries.map((itin, i) => {
		return (
			<div className="itinCard" key={i}>
				<div className="thumbnail" style={
					{backgroundImage: 'url(\'' + itin.cover + '\')', 
					backgroundPosition: 'center center', 
					backgroundSize: 'cover'}}></div>
				<p className="itinNameThumb">{itin.name}</p>
			</div>
		)
	})
	return (
		<div className="citiesGallery">
			{itinsCarrousel}
		</div>
	)
}

export default Itineraries;