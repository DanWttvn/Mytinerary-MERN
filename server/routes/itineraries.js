const express = require("express");
const router = express.Router();
const passport  = require("passport");
const itineraryModel = require("../model/itineraryModel");
const activityModel = require("../model/activityModel")
const commentayModel = require("../model/commentModel")

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
		})
		.catch(err => console.log(err));
});

// ---------GET ITINERARY for Activities --------- //
// @route GET /itineraries/itinerary/:itinID
// public access
router.get("/itinerary/:itinID", (req, res) => {
	let itineraryRequested = req.params.itinID
	console.log("get itinerary for activities by ID");	

	itineraryModel.findOne({ _id: itineraryRequested })
		.then(itinerary => {
			res.send(itinerary)
		})
		.catch(err => console.log(err));
}); 

// --------- GET ACTIVITIES BY ITINERARY --------- //
// @route GET /itineraries/activities/:itinID
// public access
router.get("/activities/:itinID", (req, res) => {
	let itineraryRequested = req.params.itinID
	console.log("get activities by itinID ROUTER");	
	console.log("itineraryRequested", itineraryRequested);

	activityModel.find({ itineraryID: itineraryRequested })
		.then(activities => {
			res.send(activities)
		})
		.catch(err => console.log(err));
}); 

// --------- ADD COMMENTAIES by itineraries --------- //
// @route POST /itineraries/comments/:itinID
// private access
router.post("/comments/:itinID", passport.authenticate("jwt", {session: false}), (req, res) => {
	console.log("add comment by itinID ROUTER");
		
	const newcomment = new commentayModel({
		content: req.body.content,
		itineraryID: req.params.itinID,
		userID: req.user._id
	})

	newcomment.save()
		.then(comment => res.json(comment))
}); 

// --------- GET COMMENTAIES by itineraries --------- //
// @route GET /itineraries/comments/:itinID
// public access
router.get("/comments/:itinID", (req, res) => {
	let itineraryRequested = req.params.itinID
	console.log("get comments by itinID ROUTER");	
	console.log("itineraryRequested", itineraryRequested);

	commentayModel.find({ itineraryID: itineraryRequested })
		.sort({ date: -1 }) // ordeno por fecha
		.then(comments => {
			res.send(comments)
		})
		.catch(err => console.log(err));
}); 



module.exports = router;
