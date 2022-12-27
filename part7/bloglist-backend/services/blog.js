/** @format */

const Blog = require("../models/blog");

const getAll = async () => {
	return await Blog.find({}).populate("user").populate("comments");
};

const deleteBlog = async (id) => {
	return await Blog.findByIdAndDelete(id);
};

const findBlogById = async (id) => {
	return await Blog.findById(id).populate("user").populate("comments");
};

const addBlog = async (blog) => {
	await blog.save();
	return blog;
};

const deleteAll = async () => {
	return await Blog.deleteMany({});
};

const saveAll = async (blogs) => {
	return await Blog.insertMany(blogs);
};

const updateBlog = async (id, blog) => {
	return await Blog.findByIdAndUpdate(id, blog, { new: true });
};

module.exports = {
	getAll,
	deleteBlog,
	findBlogById,
	addBlog,
	deleteAll,
	saveAll,
	updateBlog,
};
