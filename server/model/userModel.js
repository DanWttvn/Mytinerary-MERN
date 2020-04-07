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
		unique: true
	},
	profilePic: {
		// data: Buffer,
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