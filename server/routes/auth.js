const express = require("express");
// const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const passport  = require("passport"); // imporoting this I also import the google strategy cause I attached it by passport.use

const userModel = require("../model/userModel");

// // --------- AUTH user JWT create TOKEN
// // @route POST /auth/login
// router.post("/login", async (req, res) => {  EN USER.JS


// --------- CHECK IF USER IS LOGGED jwt --------- //
// TEST! para que me devuelva info del user (profile)
// @route GET /auth/user
// private
// esto es lo que voy a tner que poer en as rutas si tengo que autentiicarlas ????
router.get("/user", passport.authenticate("jwt", {session: false}), (req, res) => {
	userModel.findOne({ _id: req.user.id })
		.then(user => {
			res.json(user)
		})
		.catch(err => res.status(404).json({ error: "user does not exist!" }));
});


// ---------- NINJA: PASSPORT #4
// // ---------- LOG OUT
// // @route POST /auth/logout
// router.get("/logout", (req, res) => {
// 	res.send("logging out")
// })

// ---------- AUTH GOOGLE
// @route GET 5000/auth/google
router.get("/google", passport.authenticate("google", {
	scope: ["profile"] //what we want to retrieve from the users profile
})); //#8 8:40

// callback route for google to redirect
// @route POST 5000/auth/google/redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => { // esta vez que autentificamos con google, ya tenemos un code en el url. passport entende que entonces ya hemos pasado por la primera pagina. fires the cb function en pass-setup
	res.send("aqui estoy")
});







module.exports = router; 
