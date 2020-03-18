const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const passport  = require("passport");

const userModel = require("../model/userModel");


////////////////////////// FAVS //////////////////////////////
// !! CREO QUE ES EL AUTH/USER Y AHO TENGO TODA MI INFO

// --------- GET FAVS --------- //
// router.get("/favorites"), (req, res) => {
// 	userModel.find({})
// 		.then()

// }


// --------- SAVE FAVS --------- //
// @route PUT /user/favorites
// private access
router.put("/favorites", passport.authenticate("jwt", {session: false}), (req, res) => {
	console.log("POST /favorites route");
	console.log("req.user:", req.user);
	res.json(req.user)

	userModel.findByIdAndUpdate({_id: req.params.id})
	
	// encuentro mi usuario
	// const { email } = ?;
	// const { itinerary } = req.body;
	// userModel.findOne({ email })
	// 	.then(user => {
	// 		// accedo a favs y meto nuevo
	// 		user.favorites.push()
	// 		res.json(itinerary)
	// 	})
	// 	.catch(err => res.status(404).json({ error: "" }));
});





////////////////////////// ACCESS ACCOUNT //////////////////////////////

// --------- CREATE USER with TOKEN --------- // (traversy)
// @route POST /user/sign_up
// public access
router.post("/sign_up", [ 
	//--------- VALIDATION
	// expres-val middleware Esto lo pongo en axios
	check("email").isEmail().normalizeEmail(), //validaciones de express-validator. normalize para lowercase
	check("password").isLength({ min: 6 })
], (req, res) => {
	console.log("sending user for creation");

	const errors = validationResult(req); //takes the erros
	if(!errors.isEmpty()) {
		console.log(errors);
		// return res.status(422).json({ msg: errors.array() }) //mirar como display y donde se guarda ççç
		return res.status(422).json({ msg: "client error" }) //mirar como display y donde se guarda ççç
	}

	//--------- CHECK IF ALREADY EXISTS
	const { username, password, email } = req.body // extraigo del body

	userModel.findOne({ email })
		.then(user => {
			if (user) {
				console.log("User already exists");
				return res.status(400).json ({ msg: "User already exists"});
			}
			const newUser = new userModel({
				username,
				password,
				email,
				profilePic: "",
				favorites: []
			});
			//--------- AUTHENTICATION with bcrypt
			// create salt & hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;
					newUser.save()
						//--------- CREATE TOKEN jwt
						.then(newUser => {
							const payload = { 
								id: newUser.id,
								username: newUser.username
							};
							//create token when signed up so its notnecesarry to sign in afterwards
							jwt.sign (
								payload,  //the payload we want to add. this can be anything we want pero para identificar
								keys.secretOrKey,
								{ expiresIn: 2592000 },
								(err, token) => {
									if(err) throw err;
									res.json({
										token: token,
										user: {
											id: newUser.id, //es la primera vez que lo pongo, pero parece que crea uno solito
											username: newUser.username,
											email: newUser.email,
											profilePic: "",
											favorites: []
										},
										message: "Create user succesfull"
									})
								}
							)
							console.log("created new user", newUser);
							// res.redirect("http://localhost:3000/cities"); //no funciona, pero en medium esta asi
						})
				})
			})
		})
});


// --------- LOGIN user, JWT create TOKEN
// @route POST /user/login
router.post("/login", async (req, res) => { 
	console.log("sending to authenticate and compare passwords");
	const { email, password } = req.body;
	userModel.findOne({ email })
		.then(currentUser => {
			if(!currentUser) {
				console.log("This user is not registered");
				res.status(400).json({ msg: "This user is not registered, email not found" }) 
			} 
			else {
				bcrypt.compare(req.body.password, currentUser.password, function(err, isMatch) {
					if (!isMatch) { // if res = true, the passwords match
						console.log("password do not match");
						return res.status(400).json({ msg: "invalid credentials" })
					}

					const payload = { 
						id: currentUser.id,
						username: currentUser.username
					};
					jwt.sign (
						payload,  //the payload we want to add. this can be anything we want pero para identificar
						keys.secretOrKey,
						{ expiresIn: 2592000 },
						(err, token) => {
							if(err) throw err;
							res.json({
								token: token,
								user: {
									id: currentUser.id, //es la primera vez que lo pongo, pero parece que crea uno solito
									username: currentUser.username,
									email: currentUser.email,
									profilePic: currentUser.profilePic,
									favorites: currentUser.favorites
								},
							})
							console.log("logged succesfully with token");
						}
					)
				})
			}
		})
})


// ---------- LOG OUT
// @route DELETE /user/logout
router.delete("/logout", (req, res) => {
	//SOMEHOW DELETE THE TOKEN
	// set a parameter in the user collection thet it i true or false depending on whether or not the user is logged in and when checking jwt, check for this parameter as well
	res.send("logging out")
})

module.exports = router;
