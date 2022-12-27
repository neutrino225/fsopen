/** @format */

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const listHelper = require("../utils/blog_helper");
const blogService = require("../services/blog");

beforeEach(async () => {
	await blogService.deleteAll();

	await blogService.saveAll(listHelper.initialBlogs);
});

describe("JSON format", () => {
	test("notes are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	}, 100000);
});

describe("Initial blogs", () => {
	test("there are six blogs", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(listHelper.initialBlogs.length);
	});

	test("The first blog is about React patterns", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body[0].title).toBe("React patterns");
	});
});

describe("verifies that the unique identifier property of the blog posts is named id", () => {
	test("id property exists", async () => {
		const response = await api.get("/api/blogs");
		response.body.forEach((blog) => {
			expect(blog.id).toBeDefined();
		});
	});
});

describe("new blog is added successfully", () => {
	test("a valid blog can be added", async () => {
		const newBlog = {
			title: "Test blog",
			author: "Test author",
			url: "https://test.com",
			likes: 0,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");
		const titles = response.body.map((r) => r.title);

		expect(response.body).toHaveLength(listHelper.initialBlogs.length + 1);
		expect(titles).toContain("Test blog");
	});
});

describe("If number of likes for a blog is not provided it will be set to 0", () => {
	test("likes property is set to 0", async () => {
		const blogWithoutLikes = {
			title: "0 likes",
			author: "Test author",
			url: "https://test.com",
		};

		await api.post("/api/blogs").send(blogWithoutLikes).expect(201);

		const response = await api.get("/api/blogs");
		const zeroLikes = response.body.find((blog) => blog.title === "0 likes");
		console.log(zeroLikes);
		expect(zeroLikes.likes).toBe(0);
	});
});

describe("If title and url properties are missing, backend responds with status code 400 Bad Request", () => {
	test("title and url properties are missing", async () => {
		const blogWithoutTitleAndUrl = {
			author: "Test author",
			likes: 0,
		};

		await api.post("/api/blogs").send(blogWithoutTitleAndUrl).expect(400);
	});
});

describe("deletion of a blog", () => {
	test("succeeds with status code 204 if id is valid", async () => {
		const blogsAtStart = await blogService.getAll();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await blogService.getAll();

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

		const titles = blogsAtEnd.map((r) => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe("updating a blog", () => {
	test("succeeds with status code 200 if id is valid", async () => {
		const blogsAtStart = await blogService.getAll();
		const blogToUpdate = blogsAtStart[0];

		const updatedBlog = {
			title: "Updated blog",
			author: "Updated author",
			url: "https://updated.com",
			likes: 0,
		};

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
