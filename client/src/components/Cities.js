import React from 'react'
// import thumbPrueba from "../img/amsterdam/a (1).jpg"
// import { NavLink } from "react-router-dom"


const Cities = ({cities}) => {

	console.log(cities);
	
	const citiesGallery = cities.map((city, i) => {		
		return (
			// <Navlink to="/ejemplo" >
				<div className="cityCard" key={i}>
					<div className="thumbnail" style={
						{backgroundImage: 'url(\'' + city.cover + '\')', 
						backgroundPosition: 'center center', 
						backgroundSize: 'cover'}}></div>
					<p className="cityNameThumb">{city.name}</p>
				</div>
			// </Navlink>
		)
	})

	return (
		<div className="citiesGallery">
			{citiesGallery}
		</div>
	)
}

export default Cities;