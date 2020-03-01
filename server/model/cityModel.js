const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
	name: {
		type: String, //lo que acepta
		required: true //obligatorio
	},
	country: {
		type: String,
		required: true
	}
})

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model("city", citySchema)
//We set the export to a variable ‘city’ and define it as a call to mongoose.Model().