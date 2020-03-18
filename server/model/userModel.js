const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
	username: {
		type: String, //lo que acepta
		// required: true //obligatorio.loquito para hacer comprobacion en otro lado. si lo pongo me da error
		// unique: true
	},
	googleID: {
		type: String
	},
	facebookID: {
		type: String
	},
	password: {
		type: String,
		// required: true lo puedo quitar porque lo requiero desde el FE
	},
	email: {
		type: String,
		// required: true, lo puedo quitar porque lo requiero desde el FE
		// unique: true
	},
	profilePic: {
		type: String,
		required: false
	},
	register_date: {
		type: Date,
		default: Date.now
	},
	favorites: {
		type: Object,
		required: false
	}

})

//name of module is the singular version (itin) of the database name (itineraries). !!! AQUÍ ES DONDE LE ESTOY DICIENDO DONDE CONECTAR EN EL DB. pone mi "" en plural y busca una colection que se llame asi
module.exports = mongoose.model("user", userModel)
//We set the export to a variable ‘city’ and define it as a call to mongoose.Model().