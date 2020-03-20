const mongoose = require("mongoose");

const commentModel = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	itineraryID: {
		type: String, //lo que acepta
		required: true //obligatorio
	},
	userID: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model("comment", commentModel)