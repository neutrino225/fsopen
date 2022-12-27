/** @format */
const middleware = require("../utils/middleware");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const blogService = require("../services/blog");

const User = require("../models/user");
const userService = require("../services/user");

blogsRouter.get("/", async (req, res, next) => {
	try {
		const blogs = await blogService.getAll();
		res.json(blogs);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.get("/:id", async (req, res, next) => {
	try {
		const blog = await blogService.findBlogById(req.params.id);
		res.json(blog);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.post("/", middleware.userExtractor, async (req, res, next) => {
	try {
		const body = req.body;

		const userInDb = await User.findById(req.user.id);

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: userInDb._id,
		});

		const savedBlog = await blogService.addBlog(blog);
		userInDb.blogs = userInDb.blogs.concat(savedBlog._id);

		/// update user
		await userService.updateUser(userInDb._id, userInDb);

		res.status(201).json(savedBlog);
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res, next) => {
	try {
		const user = req.user;

		// const decodedToken = jwt.verify(req.token, process.env.SECRET);

		// if (!decodedToken.id) {
		// 	return response.status(401).json({ error: "token missing or invalid" });
		// }

		const blog = await Blog.findById(req.params.id);

		if (blog.user.toString() === user.id.toString()) {
			await blogService.deleteBlog(req.params.id);
			res.status(204).end();
		} else {
			res.status(401).json({ error: "token missing or invalid" });
		}
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.put("/:id", async (req, res, next) => {
	try {
		const blog = {
			title: req.body.title,
			author: req.body.author,
			url: req.body.url,
			likes: req.body.likes,
		};

		const updatedBlog = await blogService.updateBlog(req.params.id, blog);
		res.status(200).json(updatedBlog);
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogsRouter;
