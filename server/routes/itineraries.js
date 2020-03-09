const express = require("express");

const router = express.Router();

const itineraryModel = require("../model/itineraryModel");

// ---- GET ALL ITINS
// @route GET /itinearies/all ??
router.get("/all", (req, res) => { // = itinearies/all 
	itineraryModel.find({})
		.then(files => {
			res.send(files)
		})
		.catch(err => console.log(err))
});

// ---- IMPLEMENT CITY ROUTE. send correspondiente info según la ruta
router.get("/:city", (req, res) => { // : dice que cualquier otra cosa
	let cityRequested = req.params.city;
	itineraryModel.find({ city: cityRequested })
		.then(itineraries => {
			res.send(itineraries)
		})
		.catch(err => console.log(err));
});




module.exports = router;
