const express = require("express");
const { check, validationResult } = require("express-validator")

const router = express.Router();

const userModel = require("../model/userModel");

// --------- ADD USER with validation
// @route POST /user 

router.post("/", [
	check("email").isEmail(), //validaciones de express-validator
	check("password").isLength({ min: 6 })
], (req, res) => {
	console.log("añadiendo user");
	
	const errors = validationResult(req); //takes the erros
	if(!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() })
	}

	userModel.create({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	}).then(user =>	{
		res.json(user)
		console.log("created new user", user.username);
	})
	
});


module.exports = router;
