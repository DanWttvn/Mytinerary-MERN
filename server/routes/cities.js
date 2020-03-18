// TODO ESTO ES A PARTIR DE /CITIES....
const express = require("express");
const router = express.Router();
const cityModel = require("../model/cityModel");

// ---- GET ALL CITIES
// @route GET /cities/all
router.get("/all", (req, res) => { // = cities/all
	cityModel.find({})
		.then(files => {
			res.send(files)
		})
		.catch(err => console.log(err))
});

// ---- ADD NEW CITY and PREVENT DUPLICATES (change to postItins, doesnt workçççç)
// @route POST /cities/

router.post("/", (req, res) => {
	console.log("llamada post");
	
	const newName = req.body.name; //Extract title from input form
	cityModel.findOne({ name: newName }, function(err, newCity) {
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