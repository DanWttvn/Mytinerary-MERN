import React from "react"
import bgImgEx from "../../img/paris/p (6).jpg"

const LandingBg = () => {
	return (
		<div id="bg" className="bg">
				<div className="mascara"></div>
				<div className="bg-img" style={{
					backgroundImage: 'url(\'' + bgImgEx + '\')', 
					backgroundPosition: 'center center', 
					backgroundSize: 'cover'}}></div>
		</div>
	)
}

export default LandingBg;