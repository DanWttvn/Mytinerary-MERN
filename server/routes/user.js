const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const key = require("../config/keys");
const jwt = require("jsonwebtoken");

const userModel = require("../model/userModel");

// --------- CREATE USER with validation
// @route POST /user 
router.post("/sign_up", [ // expres-val middleware Esto lo pongo en axios
	check("email").isEmail().normalizeEmail(), //validaciones de express-validator. normalize para lowercase
	check("password").isLength({ min: 6 })
], (req, res) => {
	console.log("sending user for validation");

	const errors = validationResult(req); //takes the erros
	if(!errors.isEmpty()) {
		console.log(errors);
		return res.status(422).json({ errors: errors.array() })
	}

	const { username, password, email } = req.body //porque tienen el mismo nommbre?
	// let success = false; creo que no hace falta

	//check for existing user
	userModel.findOne({ email })
		.then(user => {
			if (user) {
				console.log("User already exists");
				return res.status(400).json ({ msg: "User already exists"});
			}

			const newUser = new userModel({
				username,
				password,
				email
			});

			// create salt & hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => {

							// crear sign
							const payload = { 
								id: user.id,
								username: user.username
							};

							//create token when signed up so its notnecesarry to sign in afterwards
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
										message: "Create user succesfull"
									})
								}
							)
						

							
							console.log("created new user", user);
							// res.redirect("/cities"); no funciona, pero en medium esta asi
						})
				})
			})
		})
});


// --------- LOGIN USER
// @route POST /user/login >>>>>>>>> HECHO EN AUTH.JS
// router.post("/login", (req, res) => {
// 	console.log("sending to login");
	
// 	const { email, password } = req.body;
// 	userModel.findOne({ email })
// 		.then(user => {
// 			if(!user) {
// 				console.log("This user is not registered");
// 				res.status(500).json({ msg: "This user is not registered, email not found" }) 
// 			} else {
// 				bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
// 					if (err) {
// 						throw err;
// 					}
// 					if (isMatch) { // if res = true, the passwords match
// 						//send jwt
// 						// res.redirect('/cities');
// 						console.log("login success");
// 						// res.status(200).send({ msg: "Login success" })  no funciona....
// 					} else {
// 						//they dont match	
// 						console.log("password do not match");
// 						// res.status(500).json({
// 						// 	success: false,
// 						// 	msg: "password do not match"
// 						// });
// 					}
// 				})

// 			}
// 		})

// })


module.exports = router;
