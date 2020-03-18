import React from 'react'
// import thumbPrueba from "../img/amsterdam/a (1).jpg"
import { Link } from "react-router-dom"
import AddItineraryModal from "../components/AddItineraryModal"


const Cities = ({cities}) => {

	// addWithInput = (newCity) => {
	// 	this.props.addCity(newCity) // pasar a dento del component?? ççç
	// }
	
	const citiesGallery = cities.map(city => {		
		return (
			// con las comillas `` !!! aqui hago una ruta variable segun el nombre de la ciudad
			<Link to={`cities/${city.name}`} key={city._id}> 
				<div className="cityCard" >
					<div className="thumbnail" style={
						{backgroundImage: 'url(\'' + city.img + '\')', 
						backgroundPosition: 'center center', 
						backgroundSize: 'cover'}}></div>
					{/* <img className="thumbnail" src={city.img} alt=""/> lo mismo */}
					<p className="cityNameThumb">{city.name}</p>
				</div>
			</Link>
		)
	})

	return (
		<div className="citiesGallery">
			{citiesGallery}

			<AddItineraryModal /> 
			{/* <AddItineraryModal addNewItinerary={this.addWithInput} />  */}
			{/* esta en lista ciudades, añadir despues a cada it */}

		</div>
	)
}

export default Cities;