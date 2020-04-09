const mongoose = require("mongoose");

const itineraryModel = new mongoose.Schema({
	city: {
		type: String, //lo que acepta
		required: true //obligatorio
	},
	title: {
		type: String,
		required: true
	},
	img: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	duration: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	rating: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
		default: 0
	}

})

//name of module is the singular version (itin) of the database name (itineraries). !!! AQUÍ ES DONDE LE ESTOY DICIENDO DONDE CONECTAR EN EL DB. pone mi "" en plural y busca una colection que se llame asi
module.exports = mongoose.model("itinerary", itineraryModel)
//We set the export to a variable ‘city’ and define it as a call to mongoose.Model().