/** @format */

require("dotenv").config();

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

const MONGO_URI =
	process.env.NODE_ENV === "test"
		? process.env.MONGO_TEST_URI
		: process.env.MONGO_URI;

module.exports = {
	MONGO_URI,
	PORT,
	SECRET,
};
