const express = require("express");
const router = express.Router();
const passport  = require("passport");
const itineraryModel = require("../../model/itineraryModel");
const activityModel = require("../../model/activityModel");
const commentayModel = require("../../model/commentModel")
const userModel = require("../../model/userModel")

const multer = require("multer");
const storage = multer.diskStorage({ // storage config
	destination: function(req, file, cb) {
		cb(null, "./uploads/") // aqui se va a store las pics
	}, 
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname) // this syntaxis to avoid errors in windows
	}
});
const fileFilter = (req, file, cb) => {
	//reject a file
	if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true); // saves it
	} else {
		cb(null, false); // rejects it
	}	
}
const upload = multer({
	storage,
	limits: { fileSize: 1024 * 1024 * 10 }, //5mb
	fileFilter
});


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
	// console.log("get itinerary for activities by ID");	

	itineraryModel.findOne({ _id: itineraryRequested })
		.then(itinerary => {
			res.send(itinerary)
		})
		.catch(err => console.log(err));
}); 


// --------- ADD ITINERARY --------- //
// @route POST /itineraries/itinerary/
// private access
// ççççç change single
router.post("/itinerary", upload.single("img"), passport.authenticate("jwt", {session: false}), (req, res) => {
// router.post("/itinerary", upload.single("img"), (req, res) => {
	// console.log("ROUTE post add itin");
	// console.log(req.body);
	// console.log(req.file);

	const newItin = new itineraryModel({
		// _id: new mongoose.Types.ObjectId(),
		city: req.body.city,
		title: req.body.title,
		img: req.file.path,
		summary: req.body.summary,
		duration: req.body.duration,
		price: req.body.price,
		rating: req.body.rating,
		userID: req.user._id
	});

	newItin.save()
		.then(newItin => {
			res.send(newItin)
		})
		.catch(err => console.log(err));
}); 


// --------- GET ACTIVITIES BY ITINERARY --------- //
// @route GET /itineraries/activities/:itinID
// public access
router.get("/activities/:itinID", (req, res) => {
	let itineraryRequested = req.params.itinID
	// console.log("get activities by itinID ROUTER");	
	// console.log("itineraryRequested", itineraryRequested);

	activityModel.find({ itineraryID: itineraryRequested })
		.then(activities => {
			res.send(activities)
		})
		.catch(err => console.log(err));
}); 


// --------- GET LIKES by itineraries --------- // solo para comprobaciones
// @route GET api/itineraries/likes/
// public access
router.get("/likes/:itinID", (req, res) => {
	userModel.find({ favorites: req.params.itinID })
		.then(itins => {
			// console.log(itins.length);
			const likes = itins.length.toString()
			res.send(likes)
		})
		.catch(err => console.log(err));
});

//////////////////////////////////////////////////////////////////////////

// --------- UPDATE LIKES by itineraries --------- //
// @route GET api/itineraries/likes/
// public access
router.put("/likes", async (req, res) => {
	console.log("updating LIKES in inineraryDB");
	
	const itineraryRequested = req.body.itinID
	// console.log(req.body);
	// console.log("itineraryRequested", itineraryRequested);
	
	let likes = "";

	await userModel.find({ favorites: itineraryRequested })
		.then(users => {
			likes = users.length.toString()
			console.log("likes en DB", likes);
			return likes
		})
		.catch(err => console.log(err));

	// console.log("si?", likes);

	// actualizar el model si es neceesario
	itineraryModel.findOneAndUpdate({ _id: itineraryRequested }, { likes })
		.then((itin) => {
			console.log("dentroooooo")
			// console.log("itin", itin);
			console.log(itin.likes, "antes de actualizar")			
			
			itineraryModel.findOne({ _id: itineraryRequested })
				.then(itinUpdated => {
					console.log(itinUpdated);
					res.send(itinUpdated)
				})
		})		
});

//////////////////////////////////////////////////////////////////////////

// --------- GET COMMENTS by itineraries --------- //
// @route GET /itineraries/comments/:itinID
// public access
router.get("/comments/:itinID", (req, res) => {
	let itineraryRequested = req.params.itinID
	// console.log("get comments by itinID ROUTER");	
	// console.log("itineraryRequested", itineraryRequested);

	commentayModel.find({ itineraryID: itineraryRequested })
		.sort({ date: -1 }) // ordeno por fecha
		.then(comments => {
			res.send(comments)
		})
		.catch(err => console.log(err));
}); 

// --------- ADD COMMENTS by itineraries --------- //
// @route POST /itineraries/comments/:itinID
// private access
router.post("/comments/:itinID", passport.authenticate("jwt", {session: false}), (req, res) => {
	// console.log("add comment by itinID ROUTER");
		
	const newComment = new commentayModel({
		content: req.body.content,
		itineraryID: req.params.itinID,
		userID: req.user._id
	})

	newComment.save()
		.then(comment => res.json(comment))
		// .catch(err => console.log(err))

}); 

// // --------- UPDATE LIKES by itineraries --------- //
// // @route PUT api/itineraries/likes/
// // private access
// router.put("/likes", passport.authenticate("jwt", {session: false}), (req, res) => {

// 	// itineraryModel.findOne({ _id: req.body.id })
// 	// 	.then(itin => {
// 	// 		console.log("1", itin, "2", itin.likes, "3", itin.likes[5e8c72540196500e3843cc3c]);
// 	// 		console.log(itin.likes[req.user._id]);
			
// 	// 		console.log("userID:", req.user._id);
// 	// 		res.json(itin)
// 			// const indexUserID = itin.likes.indexOf(req.user._id)
// 			// if (indexUserID !== -1) {
// 			// 	// quitar de favs
// 			// 	itin.likes.splice(indexUserID, 1) //(a partir del indexUserID, borro 1)
// 			// } else {
// 			// 	// añadir a favs
// 			// 	itin.likes.push(req.user._id)
// 			// }
			
// 			// itineraryModel.findByIdAndUpdate({_id: req.body.id}, itin)
// 			// 	.then(() => {
// 			// 		console.log("despues de update");
					
// 			// 		itineraryModel.findOne({_id: req.body.id})
// 			// 			.then(itineraryUpdated => {
// 			// 				console.log(itineraryUpdated);
// 			// 				res.json(itineraryUpdated)
// 			// 			})
// 			// 	})
// 		// })

// 	userModel.find({ favorites: req.body.id })
// 		.then(itins => {
// 			console.log(itins.length);
// 			res.json(itins)
// 		})
// }); 


// user ID: 5e8c72540196500e3843cc3c
// itinID: 5e73acac1c9d4400000159e2




module.exports = router;
