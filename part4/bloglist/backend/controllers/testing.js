/** @format */

const testingRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

testingRouter.post("/reset", async (req, res) => {
	await User.deleteMany({});

	await Blog.deleteMany({});

	res.status(204).end();
});

testingRouter.get("/check", (req, res) => {
	res.json("ok");
});

module.exports = testingRouter;
