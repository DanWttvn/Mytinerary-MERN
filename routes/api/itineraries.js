const express = require("express");
const router = express.Router();
const passport  = require("passport");
const { check, validationResult } = require("express-validator");
const itineraryModel = require("../../models/itineraryModel");
const userModel = require("../../models/userModel")
const cityModel = require("../../models/cityModel")

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




// @route    GET api/itinearies/ 
// @desc     Get all itineraries
// @access   Public
router.get("/", (req, res) => { // = itinearies/all 
	itineraryModel.find()
		.then(itineraries => {
			res.json(itineraries) // CV2: era res.send
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")
		})
});




// @route    GET api/itinearies/city/:city 
// @desc     Get itineraries by city
// @access   Public
router.get("/city/:city", (req, res) => { // : dice que cualquier otra cosa
	itineraryModel.find({ city: req.params.city })
		.then(itineraries => {
			res.json(itineraries) // CV2: era res.send
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")
		})
});




// @route    GET api/itineraries/:id 
// @desc     Get itineraries by id 
// @access   Public
router.get("/:id", (req, res) => {
	itineraryModel.findById(req.params.id)
		.then(itinerary => {
			if(!itinerary) {
				return res.status(404).json({ msg: "Itinerary not found" })
			}
			res.json(itinerary)
		})
		.catch(err => {
			console.error(err.message);
			if(err.name === "CastError") {
				return res.status(404).json({ msg: "Itinerary not found" })
			}
			res.status(500).send("Server error")
		});
}); 




// @route    POST api/itineraries
// @desc     Add an itinerary with img
// @access   Private
router.post("/", upload.single("img"), passport.authenticate("jwt", {session: false}), (req, res) => {
	//todo: add validation de todo ?
	
	userModel.findById(req.user.id).select("-password")
		.then(user => {
			const newItin = new itineraryModel({
				city: req.body.city,
				country: req.body.country,
				title: req.body.title,
				img: req.file.path,
				summary: req.body.summary,
				duration: req.body.duration,
				price: req.body.price,
				hashtags: Array.isArray(req.body.hashtags) 
					? req.body.hashtags
					: req.body.hashtags.split(",").map(hashtag => "" + hashtag.trim()),
				user: req.user.id,
				username: user.username,
				avatar: user.avatar				
			});

			newItin.save()
				// Add city to db if it doesnt exist
				.then(() => {
					cityModel.findOne({ name: req.body.city })
						.then(city => {
							if(!city) {
								const newCity = new cityModel({
									name: req.body.city,
									country: req.body.country,
									img: req.file.path
								})

								newCity.save() //* falta un return?
							}
						})
				})
				.then(() => res.json(newItin)) // CV2: res.send
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")	
		})
}); 




//* ponerlo a parte. en el UI: al añadir itin, redirigir a la pagina propia de ese itin.
// @route    POST api/itineraries/activity/:itin_id
// @desc     Add activity to an itinerary with img
// @access   Private
router.put("/activity/:itin_id", upload.single("img"), [passport.authenticate("jwt", {session: false}), [
	check("title", "Title is required").not().isEmpty()
	// check("img", "Img is required") // vale para img?
	// 	.not().isEmpty()
]], (req, res) => {

	const errors = validationResult(req)
	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	const newActivity = {
		title: req.body.title,
		img: req.file.path
	}

	itineraryModel.findById(req.params.itin_id)
		.then(itinerary => {

			if(!itinerary) {
				return res.status(404).json({ msg: "Itinerary not found" })
			}

			// Check the user who is adding the activity is the one who posted it
			if(itinerary.user.toString() !== req.user.id) { 
				return res.status(401).json({ msg: "User not authorized" })
			}

			itinerary.activities.unshift(newActivity)

			itinerary.save()
				.then(() => res.json(itinerary))
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")	
		})	
})



// @route    DELETE api/itineraries/activity/:itin_id/:activity_id
// @desc     Delete activity
// @access   Private
router.delete("/activity/:itin_id/:activity_id", passport.authenticate("jwt", {session: false}), (req, res) => {
	itineraryModel.findById(req.params.itin_id)
		.then(itinerary => {
			const removeIndex = itinerary.activities.map(activity => activity.id).indexOf(req.params.activity_id)

			itinerary.activities.splice(removeIndex, 1)

			itinerary.save()
				.then(() => res.json(itinerary))
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")	
		})
})




// @route    DELETE api/itineraries/:id 
// @desc     Delete an itinerary if yours
// @access   Private
router.delete("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	itineraryModel.findById(req.params.id)
		.then(itinerary => {
			if(!itinerary) {
				return res.status(404).json({ msg: "Itinerary not found" })
			}

			// Check the user who is deleting the post is the one who owns it
			if(itinerary.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: "User not authorized" })
			}

			itinerary.remove()
				.then(() => {
					res.json({ msg: "Itinerary Removed" })
				})
		})
		.catch(err => {
			console.error(err.message);
			if(err.name === "CastError") {
				return res.status(404).json({ msg: "Itinerary not found" })
			}
			res.status(500).send("Server error")
		});
})



//* las separo en dos. sólo una funcion action y en esa accion hago dos llamadas axios y cada una dispara un type: uno para actualizazr el reducer del user y otro el reducer del itinerary
// @route    PUT /api/itineraries/favorites/:id
// @desc     Favorite: add to itinerary likes
// @access   Private
router.put("/favorites/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
	itineraryModel.findById(req.params.id)
		.then(itin => {
			// Check if already been like
			if(itin.likes.filter(like => like.user.toString() === req.user.id).length > 0) { 
				// Get remove index
				const removeIndex = itin.likes.map(like => like.user.toString()).indexOf(req.user.id); //me devuelve todos los ids en forma de string
											
				// 2. modifica el itin
				itin.likes.splice(removeIndex, 1)
			} else {
				itin.likes.unshift({ user: req.user.id })
			}

			itin.save()
				.then(itin => res.json(itin.likes)) // sends likes array
		})
		.catch(err => {
			console.error(err.message);
			if(err.name === "CastError") {
				return res.status(404).json({ msg: "Itinerary not found" })
			}
			res.status(500).send("Server error")
		})
});



// @route    POST api/itineraries/comment/:itin_id
// @desc     Add comment on an itinerary
// @access   Private
router.post("/comment/:itin_id", [passport.authenticate("jwt", {session: false}), [
	check("content", "content is required").not().isEmpty()
]], (req, res) => {

	const errors = validationResult(req)
	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	userModel.findById(req.user.id).select("-password")
		.then(user => {
			itineraryModel.findById(req.params.itin_id)
				.then(itinerary => {

					const newComment = {
						content: req.body.content,
						username: user.username,
						avatar: user.avatar,
						user: req.user.id
					}

					itinerary.comments.unshift(newComment);

					itinerary.save()
						.then(() => res.json(itinerary.comments)) // mando array con todos los comments
				})
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")	
		})
}); 



// @route    DELETE api/itineraries/comment/:itin_id/:comment_id
// @desc     Delete a comment
// @access   Private
router.delete("/comment/:itin_id/:comment_id", passport.authenticate("jwt", {session: false}), (req, res) => {

	itineraryModel.findById(req.params.itin_id)
		.then(itinerary => {
			
			const comment = itinerary.comments.find(comment => comment.id === req.params.comment_id);			

			if(!comment) {
				return res.status(404).json({ msg: "Comment does not exist" })
			}

			if(comment.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: "User not authorized" })
			}

			// Get remove index
			const removeIndex = itinerary.comments
				.map(comment => comment.user.toString()) // returns array of users_id
				.indexOf(req.user.id);

			itinerary.comments.splice(removeIndex, 1)

			itinerary.save()
				.then(() => res.json(itinerary.comments))

		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")	
		})
}); 



module.exports = router;
