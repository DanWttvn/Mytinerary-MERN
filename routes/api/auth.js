const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport  = require("passport"); // imporoting this I also import the google strategy cause I attached it by passport.use
const { check, validationResult } = require("express-validator");
const userModel = require("../../models/userModel");



// @route    GET api/auth/user
// @desc     get User by logged user
// @access   Private
router.get("/user", passport.authenticate("jwt", {session: false}), (req, res) => {
	userModel.findById(req.user.id).select("-password")
		.then(user => {
			res.json(user)
		})
		.catch(err => res.status(500).json("user does not exist!"));
});



// @route    POST api/auth/login
// @desc     Authenticate/login user and get token
// @access   Public
router.post("/login", [
	check("email", "Please, include a valid email")
		.isEmail(),
	check("password", "Password is required")
		.exists()
], async (req, res) => { 
	// console.log("sending to authenticate and compare passwords");
	const errors = validationResult(req)
	if(!errors.isEmpty()) { // if there are errors
		return res.status(400).json({ errors: errors.array() })
	}

	const { email, password } = req.body;

	userModel.findOne({ email })
		.then(currentUser => {
			if(!currentUser) {
				// console.log("This user is not registered");
				return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
			} 

			bcrypt.compare(password, currentUser.password, function(err, isMatch) {
				if (!isMatch) { // if res = true, the passwords match
					console.error("password do not match");
					return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
				}

				const payload = {
					user: {
						id: currentUser.id
					}
				};

				jwt.sign (
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						if(err) throw err;
						res.json({ token }) // CV2: estaba incluido un objeto ser con los datos user
					}
				)
			})
		})
		.catch(err => {
			console.error(err.message);
			res.status(500).json("Server error")
		})
})



//! CHECK //
// @route    GET api/auth/google
// @desc     Login by Google
// @access   Public
router.get("/google", passport.authenticate("google", {
	scope: ["profile"] //what we want to retrieve from the users profile
})); 

// callback route for google to redirect
// @route POST 5000/auth/google/redirect
router.get("/google/redirect", passport.authenticate("google", {session: false}), (req, res) => { // esta vez que autentificamos con google, ya tenemos un code en el url. passport entende que entonces ya hemos pasado por la primera pagina. fires the cb function en pass-setup
	// console.log("redirected page");
	// console.log(req.user);
	
	const payload = { 
		id: req.user.id
	};

	jwt.sign (
		payload, 
		keys.secretOrKey,
		{ expiresIn: 2592000 },
		(err, token) => {
			if(err) throw err;

			// CHANGE BEFORE DEPLOY
			res.redirect(`http://localhost:3000/auth/${token}`) 
			// res.redirect(`https://mytinerary-pwa.herokuapp.com/auth/${token}`) 

			console.log("logged succesfully");
		}
	)	
	
});



//! CHECK //
// @route    GET api/auth/facebook
// @desc     Login by facebook
// @access   Public
router.get("/facebook", passport.authenticate("facebook"));

// callback route for facebook to redirect
// @route POST 5000/auth/facebook/redirect
router.get("/facebook/redirect", passport.authenticate("facebook", {session: false}), (req, res) => { // esta vez que autentificamos con google, ya tenemos un code en el url. passport entende que entonces ya hemos pasado por la primera pagina. fires the cb function en pass-setup
	// console.log("redirected page");
	// console.log(req.user);
	
	const payload = { 
		id: req.user.id
	};

	jwt.sign (
		payload, 
		keys.secretOrKey,
		{ expiresIn: 2592000 },
		(err, token) => {
			if(err) throw err;

			// CHANGE BEFORE DEPLOY
			res.redirect(`http://localhost:3000/auth/${token}`) 
			// res.redirect(`https://mytinerary-pwa.herokuapp.com/auth/${token}`)  

			console.log("logged succesfully");
		}
	)	
});




module.exports = router; 
