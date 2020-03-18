const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const passport  = require("passport");

const userModel = require("../model/userModel");
const itineraryModel = require("../model/itineraryModel");

/* REQS INFO
REQ.USER
{
	"_id": "5e71fde10b0a0636b89d6bd5",
	"username": "a@a.com",
	"password": "$2b$10$A5qGEAHOs3i04CdsTyUmNeX9UIne2DoaFiFGvj/EF8VbX6Bx9z0NC",
	"email": "a@a.com",
	"profilePic": "",
	"favorites": [],
	"register_date": "2020-03-18T10:54:25.485Z",
	"__v": 0
}

REQ.BODY: lo que le mande
{
	lo que le mande desde FE, eneste caso en la action desde el componente, en este caso quiero el itinerary
}

REQ.PARAMS
lo que envio en la url
*/

////////////////////////// FAVS //////////////////////////////

// --------- SAVE FAVS --------- //
// @route PUT /user/favorites
// private access
router.put("/favorites", passport.authenticate("jwt", {session: false}), (req, res) => {
	console.log("PUT user/favorites route");
	// comprobacion si ya favorito: 
	const indexItin = req.user.favorites.indexOf(req.body.id) // ese id es del itinerario

	console.log("req.body", req); 
	console.log("req.body", req.body); 
	console.log("req.body.id", req.body.id);
	console.log("indexItin", indexItin);
	
	if (indexItin !== -1) {
		// quitar de favs
		req.user.favorites.splice(indexItin, 1) //(a partir del indexItin, borro 1)
	} else {
		// añadir a favs
		req.user.favorites.push(req.body.id)
	}

	// Find the user logged, con qué quieres modificar (ya he modificado el req.user antes)
	userModel.findByIdAndUpdate({_id: req.user._id}, req.user)
		// despues de update, mandar el user de vuelta al client
		.then(() => { // si cargo aqui, me manda la version antigua, por eso find otra vez
			userModel.findOne({_id: req.user._id})
				.then(userUpdated => {
					// console.log("lo que mando del BackendPUT:", userUpdated);
					res.json(userUpdated)
				})
		})
});

// --------- GET FAVS --------- //
// @route GET /user/favorites
// private access
router.get("/favorites", passport.authenticate("jwt", {session: false}), (req, res) => {
	console.log("get itins by user.favorites");		
	// cojo mi logged user
	userModel.findOne({_id: req.user._id})
		.then(currentUser => {
			// console.log("1", currentUser);
			// console.log("2", currentUser.favorites);
			
			// cojo los itins cuyos ids coincidan con los favorites ids del user ({ nombreEnItidDB: lo que busco})
			// itineraryModel.find({ _id: '5d0371ff4cfe9c104c3328b0' }) con id no funciona
			itineraryModel.find({ title: currentUser.favorites })
				.then(favoriteItins => {
				// console.log("3", favoriteItins);
					res.json(favoriteItins)
				})
		})
}); 

//--------- para borrar, o me vale el de PUT?



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
