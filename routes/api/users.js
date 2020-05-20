const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport  = require("passport");

const userModel = require("../../models/userModel");
const itineraryModel = require("../../models/itineraryModel");

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
	limits: { fileSize: 1024 * 1024 * 5 }, //5mb
	fileFilter
});



// @route    GET api/users/
// @desc     Get all users
// @access   Public
router.get("/", (req, res) => { 
    userModel.find()
        .then(users => {
            res.send(users)
        })
        .catch(err => {
			console.error(err.message);
			res.status(500).json("Server error")
		})
});



// todo: add comprobation unique name
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", [
	check("username", "Username is required").not().isEmpty(),
	check("email", "Please, include a valid email").isEmail().normalizeEmail(),
	check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
], (req, res) => {
	// console.log("sending user for creation");
	const errors = validationResult(req)
	if(!errors.isEmpty()) { // if there are errors
		return res.status(400).json({ errors: errors.array() })
	}

	const { username, password, email } = req.body // extraigo del body

	userModel.findOne({ email })
		.then(user => {
			if (user) {
				// console.log("User already exists");
				return res.status(400).json({ errors: [{ msg: "User already exists" }] });
			}

			const newUser = new userModel({
				username,
				password,
				email
			});

			// Encrypt password
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;

					newUser.save()
						
						// Return jsonwebtoken 
						.then(newUser => {
							const payload = {
								id: newUser.id
							};
							
							jwt.sign (
								payload,
								keys.secretOrKey,
								{ expiresIn: 3600 },
								(err, token) => {
									if(err) throw err;
									// console.log("created new user", newUser);
									res.json({ token }); // CV2 quitdo user obj
								}
							)
						})
				})
			})
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).json("Server error")
		})
});



// @route    GET api/users/:id
// @desc     Get user by id
// @access   Public
router.get("/:id", (req, res) => {
	userModel.findById(req.params.id)
		.then(user => {
			if(!user) {
				return res.status(404).json({ msg: "User does not exist" })
			}
			res.send(user)
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).json("Server error")
		})
}); 



//* falta FE - d(upd_user)
// @route    PUT api/users/avatar
// @desc     Edit avatar
// @access   Private
router.put("/avatar", upload.single("avatar"), passport.authenticate("jwt", {session: false}), (req, res) => {

	req.user.avatar = req.file.path

	// Find the user logged, con qué quieres modificar (ya he modificado el req.user antes)
	userModel.findByIdAndUpdate({_id: req.user._id}, req.user)
		// despues de update, mandar el user de vuelta al client
		.then(() => { // si cargo aqui, me manda la version antigua, por eso find otra vez
			userModel.findOne({_id: req.user._id})
				.then(userUpdated => {
					res.json(userUpdated)
				})
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).json("Server error")
		})
});
 


// @route    DELETE api/users
// @desc     Delete user
// @access   Private
router.delete("/", passport.authenticate("jwt", {session: false}), (req, res) => {

	userModel.findOneAndRemove({ _id: req.user.id })
		.then(() => res.json({ msg: "User deleted" }))
	
		.catch(err => {
			console.error(err.mesage)
			res.status(500).send("Server error")
		})
});



//* las separo en dos. sólo una funcion action y en esa accion hago dos llamadas axios y cada una dispara un type: uno para actualizazr el educer del user y oro el reducer del itineary
// @route    PUT /users/favorites/:id
// @desc     Favorite: add to user favs 
// @access   Private
router.put("/favorites/:itin_id", passport.authenticate("jwt", {session: false}), (req, res) => {
	const itin_id = req.params.itin_id

	userModel.findById(req.user.id)
		.then(user => {
			// Check if already been like
			if(user.favorites.filter(favorite => favorite.itinerary.toString() === itin_id).length > 0) { 
				// Get remove index
				const removeIndex = user.favorites.map(favorite => favorite.itinerary.toString()).indexOf(itin_id);
				// 2. modifica el user
				user.favorites.splice(removeIndex, 1)
			} else {
				user.favorites.unshift({ itinerary: itin_id })
			}

			user.save()
				.then(user => res.json(user.favorites)) // sends favorites array
		})
		.catch(err => {
			console.error(err.message);
			// if(err.name === "CastError") {
			// 	return res.status(404).json({ msg: "Itinerary not found" })
			// }
			res.status(500).send("Server error")
		})
});



// @route    GET /users/favorites/f
// @desc     Get favorites by user
// @access   Private
router.get("/favorites/f", passport.authenticate("jwt", {session: false}), (req, res) => {

	userModel.findById(req.user.id)
		.then(currentUser => {
			// Array of favorites Ids
			const favsIds = currentUser.favorites.map(favorite => favorite.itinerary.toString())
			
			itineraryModel.find({ _id: favsIds })
				.then(favoriteItins => {
					if(!favoriteItins) {
						return res.status(400).json({ msg: "No favorites" })
					}
					res.json(favoriteItins)
				})
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).send("Server error")
		})
});



module.exports = router;
