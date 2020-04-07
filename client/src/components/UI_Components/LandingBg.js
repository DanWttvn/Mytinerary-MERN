import React from "react"
import bgImgEx from "../../img/parisBG.jpg"

const LandingBg = () => {
	return (
		<div id="bg" className="bg">
				<div className="mascara"></div>
				<div className="bg-img" style={{
					backgroundImage: 'url(\'' + bgImgEx + '\')'}}></div>
		</div>
	)
}

export default LandingBg;