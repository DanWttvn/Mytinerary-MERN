const express = require("express");
const router = express.Router();
const cityModel = require("../../models/cityModel");



// @route    GET api/cities
// @desc     Get all cities
// @access   Private
router.get("/", (req, res) => { // = cities/all
	cityModel.find()
		.then(cities => {
			res.json(cities) //CV2: res.send
		})
		.catch(err => console.log(err))
});



//* ADD NEW CITY and PREVENT DUPLICATES (change to postItins, doesnt workçççç)
//* no ui
// @route POST /cities/

// router.post("/", (req, res) => {
// 	console.log("llamada post");
	
// 	const newName = req.body.name; //Extract title from input form
// 	cityModel.findOne({ name: newName }, function(err, newCity) {
// 		if(err) {console.log(err)}
		
// 		if (newCity) {
// 			console.log("This has already been saved");
// 			res.status(500).send("This has already been saved")
			
// 		} else {
// 			const newCity = new cityModel ({
// 				name: req.body.name,
// 				country: req.body.country
// 			})
// 			// const newCity = new cityModel (req.body)

// 			newCity.save()
// 				.then(city => {
// 					res.send(city);
// 					console.log("New city created");
// 					res.redirect("/");
// 				})
// 				.catch(err => {
// 					res.status(500).send("Server error")
// 				})
			
// 		}
// 	});
// });


module.exports = router;