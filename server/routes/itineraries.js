const express = require("express");
const router = express.Router();
const itineraryModel = require("../model/itineraryModel");

// ---- GET ALL ITINS
// @route GET /itinearies/all 
router.get("/all", (req, res) => { // = itinearies/all 
	itineraryModel.find({})
		.then(files => {
			res.send(files)
		})
		.catch(err => console.log(err))
});

// ---- GET ITIN BY CITY. send correspondiente info según la ruta
// @route GET /itinearies/:city
router.get("/:city", (req, res) => { // : dice que cualquier otra cosa
	let cityRequested = req.params.city;
	itineraryModel.find({ city: cityRequested })
		.then(itineraries => {
			res.send(itineraries)
			// console.log(itineraries);			
		})
		.catch(err => console.log(err));
});

// ---------GET ITINERARY for Activities --------- //
// @route GET /itineraries/itinerary/:itinID
// private access
router.get("/itinerary/:itinID", (req, res) => {
	let itineraryRequested = req.params.itinID
	console.log("get activities by itin ID");	
	console.log(itineraryRequested);
	
	// const titleEX = "Visit the O2"

	// itineraryModel.findOne({ rating: itineraryRequested})
	// itineraryModel.findOne({ title:	titleEX})
	// itineraryModel.findOne({ _id: itineraryRequested})
	itineraryModel.findOne({ _id: itineraryRequested })
		.then(itinerary => {
			res.send(itinerary)
			console.log(itinerary);
		})
		.catch(err => console.log(err));
}); 

// --------- GET ACTIVITIES BY ITINERARY --------- //
// @route GET /itineraries/activities/:itinID
// private access
// router.get("/activities/:itinID", (req, res) => {
// 	let itineraryRequested = req.params.itinID
// 	console.log("get activities by itin ID");		
// 	// cojo mi logged user
// 	userModel.findOne({_id: req.user._id})
// 		.then(currentUser => {
// 			// console.log("1", currentUser);
// 			// console.log("2", currentUser.favorites);
			
// 			// cojo los itins cuyos ids coincidan con los favorites ids del user ({ nombreEnItidDB: lo que busco})
// 			// itineraryModel.find({ _id: '5d0371ff4cfe9c104c3328b0' }) con id no funciona
// 			itineraryModel.find({ title: currentUser.favorites })
// 				.then(favoriteItins => {
// 				// console.log("3", favoriteItins);
// 					res.json(favoriteItins)
// 				})
// 		})
// }); 




module.exports = router;
