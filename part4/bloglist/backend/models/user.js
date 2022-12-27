/** @format */

const mongoose = require("mongoose");
const blog = require("./blog");

const userSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true, minlength: 3 },
	name: String,
	passwordHash: { type: String, required: true, minlength: 3 },
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		},
	],
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();

		returnedObject.blogs.forEach((blog) => {
			delete blog.user;
		});

		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

module.exports = mongoose.model("User", userSchema);
