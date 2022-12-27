/** @format */

const userRouter = require("express").Router();
const User = require("../models/user");
const userService = require("../services/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res, next) => {
	try {
		const users = await userService.getAll();
		res.json(users);
	} catch (exception) {
		next(exception);
	}
});

userRouter.get("/:id", async (req, res, next) => {
	try {
		const user = await userService.findUserById(req.params.id);
		res.json(user);
	} catch (exception) {
		next(exception);
	}
});

userRouter.post("/", async (req, res, next) => {
	try {
		const { username, name, password } = req.body;
		if (password.length < 3) {
			return res
				.status(400)
				.json({ error: "password must be at least 3 characters long" });
		}
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const user = new User({
			username,
			name,
			passwordHash,
		});
		const savedUser = await user.save();

		res.status(201).json(savedUser);
	} catch (error) {
		next(error);
	}
});

module.exports = userRouter;
