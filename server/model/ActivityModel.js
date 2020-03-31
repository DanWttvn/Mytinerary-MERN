const mongoose = require("mongoose");

const activityModel = new mongoose.Schema({
	itineraryID: {
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
	}
})

//name of module is the singular version (itin) of the database name (activities). !!! AQUÍ ES DONDE LE ESTOY DICIENDO DONDE CONECTAR EN EL DB. pone mi "" en plural y busca una colection que se llame asi
module.exports = mongoose.model("activity", activityModel)
