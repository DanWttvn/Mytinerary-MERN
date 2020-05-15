import React from 'react'
// import thumbPrueba from "../img/amsterdam/a (1).jpg"
import { Link } from "react-router-dom"


const Cities = ({cities}) => {

	const citiesGallery = cities.map(city => {
		//Uploaded imgs
		const imgURL = "url(" + city.img + ")"
		const imgURLDisplay = imgURL.replace(/\\/g, "/");  // the \ gives me an error, so i have to change it to /	

		return (
			<Link to={`cities/${city.name}`} key={city._id}> 
				<div className="city-card" >
					<div className="thumbnail" style={
						{backgroundImage: imgURLDisplay, 
						backgroundPosition: 'center center', 
						backgroundSize: 'cover'}}></div>
					{/* <img className="thumbnail" src={city.img} alt=""/> lo mismo */}
					<p className="city-name-thumb">{city.name}</p>
				</div>
			</Link>
		)
	})

	return (
		<div className="cities-gallery">
			{citiesGallery}
		</div>
	)
}

export default Cities;