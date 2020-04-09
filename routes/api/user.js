const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport  = require("passport");

const userModel = require("../../model/userModel");
const itineraryModel = require("../../model/itineraryModel");

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

// --------- GET ALL USERS --------- //
// @route GET /user/all
// public access
router.get("/all", (req, res) => { 
    userModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err))
});


// --------- GET USER BY ID --------- //
// @route GET /user/info/:userID
// public access
router.get("/info/:userID", (req, res) => {
	let userRequested = req.params.userID
	// console.log("get user by ID");	

	userModel.findOne({ _id: userRequested })
		.then(user => {
			res.send(user)
		})
		.catch(err => console.log(err));
}); 

// --------- EDIT USER / IMAGES --------- //
// @route PUT /user/info/:userID
// private access
router.put("/info/profilePic", upload.single("profilePic"), passport.authenticate("jwt", {session: false}), (req, res) => { // .single para solo 1 file
	// console.log("PUT user IMAGES route");
	// console.log(req.file);
	
	// upload profileImg
	req.user.profilePic = req.file.path

	// Find the user logged, con qué quieres modificar (ya he modificado el req.user antes)
	userModel.findByIdAndUpdate({_id: req.user._id}, req.user)
		// despues de update, mandar el user de vuelta al client
		.then(() => { // si cargo aqui, me manda la version antigua, por eso find otra vez
			userModel.findOne({_id: req.user._id})
				.then(userUpdated => {
					res.json(userUpdated)
				})
		})
});
 

////////////////////////// FAVS //////////////////////////////

// --------- UPDATE FAVS --------- //
// @route PUT /user/favorites
// private access
router.put("/favorites", passport.authenticate("jwt", {session: false}), (req, res) => {
	// console.log("PUT user/favorites route");
	const itinID = req.body.id

	// comprobacion si ya favorito: 
	const indexItin = req.user.favorites.indexOf(itinID) // ese id es del itinerario
	let addOrRemove = 0; // adds or substracts 1 to the likes counter in the itin

	if (indexItin !== -1) {
		// REMOVE from favorites
		req.user.favorites.splice(indexItin, 1) //(a partir del indexItin, borro 1)
		addOrRemove = -1
	} else {
		// ADD to favorites
		req.user.favorites.push(itinID)
		addOrRemove = +1
	}

	// -------- UPDATE ITIN.LIKES --------- //
	itineraryModel.findOneAndUpdate(
		{ _id: itinID }, 
		{ $inc: {likes: addOrRemove } }
	)
		.then((itin) => {
			// console.log(itin.likes, "LIKES antes de actualizar")			
			// itineraryModel.findOne({ _id: itinID })
				// .then(itinUpdated => {
				// 	console.log(itinUpdated.likes, "LIKES despues de actualizar");
				// })
		})

	// -------- UPDATE USER --------- //
	// Find the user logged, con qué quieres modificar. actualizo la db con mi store de redux que acabo de cambiar
	userModel.findByIdAndUpdate({_id: req.user._id}, req.user)
		// despues de update, mandar el user de vuelta al client
		.then(() => { // si cargo aqui, me manda la version antigua, por eso find otra vez
			// console.log("actualizando user");			
			userModel.findOne({_id: req.user._id})
				.then(userUpdated => {
					// esto es lo qeu mando al dispatcch para que se update en redux
					res.send(userUpdated)
				})
		})
});

// --------- GET FAVS --------- //
// @route GET /user/favorites
// private access
router.get("/favorites", passport.authenticate("jwt", {session: false}), (req, res) => {
	// console.log("get itins by user.favorites");		
	// cojo mi logged user
	userModel.findOne({_id: req.user._id})
		.then(currentUser => {
			// cojo los itins cuyos ids coincidan con los favorites ids del user ({ nombreEnItidDB: lo que busco})
			itineraryModel.find({ _id: currentUser.favorites })
				.then(favoriteItins => {
					res.json(favoriteItins)
				})
		})
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
	// console.log("sending user for creation");

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
				// console.log("User already exists");
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
						})
				})
			})
		})
});


// --------- LOGIN user, JWT create TOKEN
// @route POST /user/login
router.post("/login", async (req, res) => { 
	// console.log("sending to authenticate and compare passwords");
	const { email, password } = req.body;
	userModel.findOne({ email })
		.then(currentUser => {
			if(!currentUser) {
				// console.log("This user is not registered");
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
							console.log("logged succesfully");
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
