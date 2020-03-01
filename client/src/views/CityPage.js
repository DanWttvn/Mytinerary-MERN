import React from 'react'
import thumbPrueba from "../img/amsterdam/a (1).jpg"
import Navbar from "../components//Navbar"
import Logo from "../components//Logo"
import ExtraInfoIT from "../components//ExtraInfoIT"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'


// import HeartIcon from "./HeartIcon"


const CityPage = () => {

	// const itinsCarrousel = itinsFromParent.map((itin, i) => {
	// 	return (
	// 		<div className="itinCard" key={i}>
				// <div className="thumbnail" style={
				// 	{backgroundImage: 'url(\'' + itin.cover + '\')', 
				// 	backgroundPosition: 'center center', 
				// 	backgroundSize: 'cover'}}></div>
// 				<p className="itinNameThumb">{itin.name}</p>
	// 		</div>
	// 	)
	// })

	// return (
	// 	<div className="container">
	// 		<Navbar/>
	// 		<h3>{CityPage.name}</h3>
	// 		{itinsCarrousel}
	// 	</div>
	// )


	return (
		<div className="container">
			<Logo/>
			<h3 className="cityName">Amsterdam</h3>

			<div className="itinsCarrousel">
		{/* MAS CARROUSEL, NO SCROLL, QUE SOBRESALGA ALGO PERO SE QUEDE PILLADO */}
				<div className="itinCard">
					<div className="itinPrev" style={{backgroundImage: 'url(\'' + thumbPrueba + '\')', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
						<FontAwesomeIcon icon={farHeart} className="faHeart farHeart"/>
						<FontAwesomeIcon hidden icon={fasHeart} className="faHeart fasHeart"/>
						<div className="itinInfoPrev">
							<p className="title">Amsterdam</p>
							<p className="">Lorem ipsum dolor sitamet cotur adipisicing elit y algo mas.</p>
						</div>		
					</div>
					<ExtraInfoIT/>
				</div>

				<div className="itinCard">
					<div className="itinPrev" style={{backgroundImage: 'url(\'' + thumbPrueba + '\')', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
						<FontAwesomeIcon icon={farHeart} className="faHeart farHeart"/>
						<FontAwesomeIcon hidden icon={fasHeart} className="faHeart fasHeart"/>
						<div className="itinInfoPrev">
							<p className="title">Amsterdam</p>
							<p className="">Lorem ipsum dolor sitamet cotur adipisicing elit y algo mas.</p>
						</div>		
					</div>
					<ExtraInfoIT/>
				</div>

				<div className="itinCard">
					<div className="itinPrev" style={{backgroundImage: 'url(\'' + thumbPrueba + '\')', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
						<FontAwesomeIcon icon={farHeart} className="faHeart farHeart"/>
						<FontAwesomeIcon hidden icon={fasHeart} className="faHeart fasHeart"/>
						<div className="itinInfoPrev">
							<p className="title">Amsterdam</p>
							<p className="">Lorem ipsum dolor sitamet cotur adipisicing elit y algo mas.</p>
						</div>		
					</div>
					<ExtraInfoIT/>
				</div>

				

				
			
			</div>

			<Navbar/>
		</div>
	)
}



export default CityPage;