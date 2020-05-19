const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
	username: {
		type: String, //lo que acepta
		required: function validate() {
			if(this.googleID || this.facebookID) {
				return false;
			} else {
				return true;
			}
		},
		unique: function validate() {
			if(this.googleID || this.facebookID) {
				return false;
			} else {
				return true;
			}
		}
	},
	googleID: {
		type: String
	},
	facebookID: {
		type: String
	},
	password: {
		type: String,
		required: function validate() {
			if(this.googleID || this.facebookID) {
				return false;
			} else {
				return true;
			}
		}
	},
	email: {
		type: String,
		required: function validate() {
			if(this.googleID || this.facebookID) {
				return false;
			} else {
				return true;
			}
		},
		unique: function validateUnique() {
			if(this.googleID || this.facebookID) {
				return false;
			} else {
				return true;
			}
		}
	},
	avatar: {
		// data: Buffer,
		type: String,
		required: false
	},
	favorites: [
		// {
		// 	type: String
		// }
		{
			itinerary: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "itineraries"
			}
		}
	],
	register_date: {
		type: Date,
		default: Date.now
	}
})

//name of module is the singular version (itin) of the database name (itineraries). !!! AQUÍ ES DONDE LE ESTOY DICIENDO DONDE CONECTAR EN EL DB. pone mi "" en plural y busca una colection que se llame asi
module.exports = mongoose.model("user", userModel)
//We set the export to a variable ‘city’ and define it as a call to mongoose.Model().