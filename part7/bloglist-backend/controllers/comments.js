/** @format */

const middleware = require("../utils/middleware");
const commentsRouter = require("express").Router();
const Comment = require("../models/comments");
const blogService = require("../services/blog");

commentsRouter.post(
	"/:id",
	middleware.userExtractor,
	async (req, res, next) => {
		try {
			// find out which blog you are commenting
			const id = req.params.id;

			const comment = new Comment({
				text: req.body.comment,
			});

			// save comment
			await comment.save();

			const blog = await blogService.findBlogById(id);

			// push the comment into the post.comments array
			blog.comments.push(comment);

			const newBlog = await blogService.updateBlog(blog.id, blog);
			await newBlog.populate("user");
			await newBlog.populate("comments");
			res.json(newBlog);
		} catch (exception) {
			next(exception);
		}
	}
);

module.exports = commentsRouter;
