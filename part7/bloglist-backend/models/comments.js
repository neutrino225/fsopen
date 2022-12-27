/** @format */

const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
	text: {
		type: String,
		trim: true,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

commentSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Comment", commentSchema);
