const express = require("express");

const router = express.Router();

const cityModel = require("../model/cityModel");

// ADD TEST ROUTE
// router.get("/test", (req, res) => {
// 	res.send({ msg: 'Cities test route.' });
// });

// GET ALL CITIES
let getCities = router.get("/all", (req, res) => {
	cityModel.find({})
		.then(files => {
			res.send(files)
		})
		.catch(err => console.log(err))
});

// TO ADD NEW CITIES
// router.post("/", (req, res) => {
// 	const newCity = new cityModel({
// 		name: req.body.name,
// 		country: req.body.country
// 	})
	
// 	newCity.save()
// 		.then(city => {
// 			res.send(city)
// 		})
// 		.catch(err => {
// 			res.status(500).send("Server error")
// 		})
// });

// ADD NEW CITY and PREVENT DUPLICATES
router.post("/", (req, res) => {
	const newName = req.body.name; //Extract title from input form
	cityModel.findOne({name: newName}, function(err, newCity) {
		if(err) {console.log(err)}
		
		if (newCity) {
			console.log("This has already been saved");
			res.status(500).send("This has already been saved")
			
		} else {
			const newCity = new cityModel ({
				name: req.body.name,
				country: req.body.country
			})
			// const newCity = new cityModel (req.body)

			newCity.save()
				.then(city => {
					res.send(city);
					console.log("New city created");
					res.redirect("/");
				})
				.catch(err => {
					res.status(500).send("Server error")
				})
			
		}
	});
});


module.exports = router;