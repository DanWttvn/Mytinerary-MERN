const express = require("express");
// const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const key = require("../config/keys");
const jwt = require("jsonwebtoken");
const passport  = require("passport"); // imporoting this I also import the google strategy cause I attached it by passport.use

const userModel = require("../model/userModel");

// --------- AUTH user
// @route POST /auth/login
router.post("/login", (req, res) => {
	console.log("sending to auth");
	
	const { email, password } = req.body;
	userModel.findOne({ email })
		.then(user => {
			if(!user) {
				console.log("This user is not registered");
				res.status(500).json({ msg: "This user is not registered, email not found" }) 
			} else {
				bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
					if (!isMatch) { // if res = true, the passwords match
						console.log("password do not match");
						return res.status(400).json({ msg: "invalid credentials" })
					}

					const payload = { 
						id: user.id,
						username: user.username
					};

					jwt.sign (
						payload,  //the payload we want to add. this can be anything we want pero para identificar
						key.secretOrKey,
						{ expiresIn: 2592000 },

						(err, token) => {
							if(err) throw err;

							res.json({
								token: token,
								user: {
									id: user.id, //es la primera vez que lo pongo, pero parece que crea uno solito
									username: user.username,
									email: user.email
								},
								success: true,
								message: "Logged user succesfull"
							})
							console.log("logged succesfully");
						}
					)
				})

			}
		})

})


// ---------- NINJA: PASSPORT #4

// ---------- LOG OUT
// @route POST /auth/logout
router.get("/logout", (req, res) => {
	res.send("logging out")
})

// ---------- AUTH GOOGLE
// @route POST 5000/auth/google
router.get("/google", passport.authenticate("google", {
	scope: ["profile"] //what we want to retrieve from the users profile
})); //#8 8:40

// callback route for google to redirect
// @route POST 5000/auth/google/redirect
router.get("/google/redirect", (req, res) => {
	res.send("aqui estoy")
	
});






module.exports = router; 
