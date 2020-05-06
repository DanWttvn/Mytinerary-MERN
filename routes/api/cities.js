const express = require("express");
const router = express.Router();
const cityModel = require("../../models/cityModel");



// @route    GET api/cities
// @desc     Get all cities
// @access   Private
router.get("/", (req, res) => { // = cities/all
	cityModel.find()
		.then(cities => {
			res.json(cities) //CV2: res.send
		})
		.catch(err => console.log(err))
});



//* se añade automaticamente al añadir itin
// @route    POST api/cities
// @desc     Add cities (test)
// @access   Public
router.post("/", (req, res) => {

	cityModel.findOne({ name: req.body.name })
		.then(city => {
			if (city) {
				return res.status(500).send("This city already exists")
			} 
			
			const newCity = new cityModel ({
				name: req.body.name,
				country: req.body.country,
				img: req.body.img
			})

			newCity.save()
				.then(city => res.send(city))

		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")	
		})	
})



module.exports = router;