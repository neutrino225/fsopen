/** @format */

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return null;
	const favorite = blogs.reduce((prev, current) =>
		prev.likes > current.likes ? prev : current
	);
	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	};
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null;

	const authors = blogs.map((blog) => blog.author);
	const uniqueAuthors = [...new Set(authors)];

	const blogsByEach = uniqueAuthors.map((author) => {
		return {
			author: author,
			blogs: blogs.filter((blog) => blog.author === author).length,
		};
	});

	const mostActive = blogsByEach.reduce((prev, curr) => {
		return prev.blogs > curr.blogs ? prev : curr;
	});

	return mostActive;
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null;

	const authors = blogs.map((blog) => blog.author);
	const uniqueAuthors = [...new Set(authors)];

	const likesByEach = uniqueAuthors.map((author) => {
		return {
			author: author,
			likes: blogs
				.filter((blog) => blog.author === author)
				.reduce((sum, blog) => sum + blog.likes, 0),
		};
	});

	const mostLiked = likesByEach.reduce((prev, curr) => {
		return prev.likes > curr.likes ? prev : curr;
	});
	return mostLiked;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
