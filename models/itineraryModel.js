const mongoose = require("mongoose");

const itineraryModel = new mongoose.Schema({
	city: {
		type: String, //lo que acepta
		required: true //obligatorio
	},
	country: {
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
	activities: [
		{
			title: {
				type: String,
			},
			img: {
				type: String,
			}
		}
	],
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users"
			},
			username: {
				type: String
			},
			avatar: {
				type: String
			},
			content: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	username: { // User name. lo poe aqui para luego poder mantener los posts de ese user si se borra la cuenta
		type: String
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
})

//name of module is the singular version (itin) of the database name (itineraries). !!! AQUÍ ES DONDE LE ESTOY DICIENDO DONDE CONECTAR EN EL DB. pone mi "" en plural y busca una colection que se llame asi
module.exports = mongoose.model("itinerary", itineraryModel)
//We set the export to a variable ‘city’ and define it as a call to mongoose.Model().