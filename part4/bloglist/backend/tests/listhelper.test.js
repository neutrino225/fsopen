/** @format */

const listHelper = require("../utils/list_helper");

const blogs = [];

const oneBlog = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
];

const moreThanOneBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
];

test("dummy returns one", () => {
	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("totalLikes", () => {
	test("of empty list is zero", () => {
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(0);
	});

	test("when list has only one blog equals the likes of that", () => {
		const result = listHelper.totalLikes(oneBlog);
		expect(result).toBe(7);
	});

	test("of a bigger list is calculated right", () => {
		const result = listHelper.totalLikes(moreThanOneBlogs);

		expect(result).toBe(36);
	});

	describe("favoriteBlog", () => {
		test("of empty list is null", () => {
			const blogs = [];
			const result = listHelper.favoriteBlog(blogs);
			expect(result).toBe(null);
		});

		test("when list has only one blog equals the blog", () => {
			const result = listHelper.favoriteBlog(oneBlog);
			expect(result).toEqual({
				title: "React patterns",
				author: "Michael Chan",
				likes: 7,
			});
		});

		test("of a bigger list is calculated right", () => {
			const result = listHelper.favoriteBlog(moreThanOneBlogs);
			expect(result).toEqual({
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				likes: 12,
			});
		});
	});

	describe("mostBlogs", () => {
		test("of empty list is null", () => {
			const blogs = [];
			const result = listHelper.mostBlogs(blogs);
			expect(result).toBe(null);
		});

		test("when list has only one blog equals the blog", () => {
			const result = listHelper.mostBlogs(oneBlog);
			expect(result).toEqual({ author: "Michael Chan", blogs: 1 });
		});

		test("of a bigger list is calculated right", () => {
			const result = listHelper.mostBlogs(moreThanOneBlogs);
			expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
		});
	});

	describe("mostLikes", () => {
		test("of empty list is null", () => {
			const blogs = [];
			const result = listHelper.mostLikes(blogs);
			expect(result).toBe(null);
		});

		test("when list has only one blog equals the blog", () => {
			const result = listHelper.mostLikes(oneBlog);
			expect(result).toEqual({ author: "Michael Chan", likes: 7 });
		});

		test("of a bigger list is calculated right", () => {
			const result = listHelper.mostLikes(moreThanOneBlogs);
			expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
		});
	});
});
