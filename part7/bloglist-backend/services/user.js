/** @format */

const User = require("../models/user");

const getAll = async () => {
	return await User.find({}).populate("blogs");
};

const deleteUser = async (id) => {
	return await User.findByIdAndDelete(id);
};

const findUserById = async (id) => {
	return await User.findById(id);
};

const addUser = async (user) => {
	await user.save();
	return user;
};

const updateUser = async (id, user) => {
	return await User.findByIdAndUpdate(id, user, { new: true });
};

const findUserByName = async (username) => {
	return await User.findOne({ username });
};

module.exports = {
	getAll,
	deleteUser,
	findUserById,
	addUser,
	updateUser,
	findUserByName,
};
