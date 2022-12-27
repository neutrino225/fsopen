/** @format */

const Comment = require("../models/comments");

const getAll = async () => {
	return await Comment.find({}).populate("blogs");
};

const findCommentById = async (id) => {
	return await Comment.findById(id);
};

const updateComment = async (id, comment) => {
	return await Comment.findByIdAndUpdate(id, comment, { new: true });
};

module.exports = {
	getAll,
	findCommentById,
	updateComment,
};
