const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const passport  = require("passport"); // imporoting this I also import the google strategy cause I attached it by passport.use

const userModel = require("../model/userModel");

// --------- CHECK IF USER IS LOGGED jwt --------- //
// @route GET /auth/user
// private
// check everytime if the user is logged in. Así protejo la ruta. Al poner passp.auth, voy a tener que pasarle el TOKEN en la peticion axios(en authActions)
router.get("/user", passport.authenticate("jwt", {session: false}), (req, res) => {
	userModel.findOne({ _id: req.user.id })
		.then(user => {
			res.json(user)
		})
		.catch(err => res.status(404).json({ error: "user does not exist!" }));
});

// ---------- AUTH GOOGLE --------- //
// @route GET 5000/auth/google
router.get("/google", passport.authenticate("google", {
	scope: ["profile"] //what we want to retrieve from the users profile
})); //#8 8:40

// callback route for google to redirect
// @route POST 5000/auth/google/redirect
router.get("/google/redirect", passport.authenticate("google", {session: false}), (req, res) => { // esta vez que autentificamos con google, ya tenemos un code en el url. passport entende que entonces ya hemos pasado por la primera pagina. fires the cb function en pass-setup
	res.redirect("http://localhost:3000/cities") 
});

// ---------- AUTH FACEBOOK --------- //
// @route GET 5000/auth/facebook
router.get("/facebook", passport.authenticate("facebook"));

// callback route for facebook to redirect
// @route POST 5000/auth/facebook/redirect
router.get("/facebook/redirect", passport.authenticate("facebook", {session: false}), (req, res) => { // esta vez que autentificamos con google, ya tenemos un code en el url. passport entende que entonces ya hemos pasado por la primera pagina. fires the cb function en pass-setup
	res.redirect("http://localhost:3000/cities") 
});

// --------- SAVE FAVS --------- //
router.post("/favorites", passport.authenticate("jwt", {session: false}), (req, res) => {
	console.log("POST /favorites route");
	
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




module.exports = router; 
