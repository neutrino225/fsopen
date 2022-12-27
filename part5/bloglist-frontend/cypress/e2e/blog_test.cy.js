/** @format */

describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		const user = {
			name: "Test User",
			username: "testuser",
			password: "testpassword",
		};

		cy.request("POST", "http://localhost:3001/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		{
			cy.contains("login");
		}
	});

	it("fails with wrong password", function () {
		cy.get("#login-username").type("testuser");
		cy.get("#login-password").type("wrongpassword");
		cy.get("#login-button").click();
		cy.get(".error").contains("Wrong username or password");
	});

	it("succeeds with correct credentials", function () {
		setTimeout(() => {}, 5000);
		cy.get("#login-username").type("testuser");
		cy.get("#login-password").type("testpassword");
		cy.get("#login-button").click();
		cy.contains("Test User logged in");
		cy.contains("logout");
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.get("#login-username").type("testuser");
			cy.get("#login-password").type("testpassword");
			cy.get("#login-button").click();
		});

		it("A blog can be created", function () {
			cy.contains("create new blog").click();
			cy.get("#title").type("Test Blog");
			cy.get("#author").type("Test Author");
			cy.get("#url").type("Test URL");
			cy.get(".createBlog").click();
			cy.contains("Test Blog Test Author");
		});

		describe("After blog is created", function () {
			beforeEach(function () {
				cy.contains("create new blog").click();
				cy.get("#title").type("Test Blog");
				cy.get("#author").type("Test Author");
				cy.get("#url").type("Test Url");
				cy.get(".createBlog").click();
			});

			it("Blog can be viewed", function () {
				cy.get("#view-blog").click();
				cy.contains("hide");
				cy.contains("Test Url");
				cy.contains("like");
				cy.contains("remove");
			});

			it("Blog can be liked", function () {
				cy.get("#view-blog").click();
				cy.contains("Likes: 0");
				cy.get("#like-blog-button").click();
				cy.get(".success").contains("You liked Test Blog by Test Author");
				cy.contains("Likes: 1");
			});

			it("a test for ensuring that the user who created a blog can delete it", function () {
				cy.get("#view-blog").click();
				cy.get(".remove").click();
				cy.get(".success").contains("Deleted sucessfully");
			});
		});
	});
});

describe("Deletion of a blog", function () {
	it("ensures that user that did not create blog can not delete it", function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		const user1 = {
			name: "Test User 1",
			username: "testuser1",
			password: "testpassword1",
		};

		const user2 = {
			name: "Test User 2",
			username: "testuser2",
			password: "testpassword2",
		};

		cy.request("POST", "http://localhost:3001/api/users/", user1);
		cy.request("POST", "http://localhost:3001/api/users/", user2);
		cy.visit("http://localhost:3000");

		cy.get("#login-username").type("testuser1");
		cy.get("#login-password").type("testpassword1");
		cy.get("#login-button").click();

		cy.contains("create new blog").click();
		cy.get("#title").type("Test Blog");
		cy.get("#author").type("Test Author");
		cy.get("#url").type("Test URL");
		cy.get(".createBlog").click();
		cy.contains("Test Blog Test Author");

		cy.contains("logout").click();

		cy.get("#login-username").type("testuser2");
		cy.get("#login-password").type("testpassword2");
		cy.get("#login-button").click();

		cy.contains("Test Blog Test Author");
		cy.get("#view-blog").click();
		cy.get(".remove").click();
		cy.get(".error").contains("Error deleting blog");
	});
});

describe("Sorting check", function () {
	it("Blog with most likes appears at top", function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		const user1 = {
			name: "Test User 1",
			username: "testuser1",
			password: "testpassword1",
		};

		cy.request("POST", "http://localhost:3001/api/users/", user1);
		cy.visit("http://localhost:3000");

		cy.get("#login-username").type("testuser1");
		cy.get("#login-password").type("testpassword1");
		cy.get("#login-button").click();

		cy.contains("create new blog").click();
		cy.get("#title").type("Test Blog 1");
		cy.get("#author").type("Test Author 1");
		cy.get("#url").type("Test URL 1");
		cy.get(".createBlog").click();

		cy.get(".blog").eq(0).should("contain", "Test Blog 1");

		cy.contains("create new blog").click();
		cy.get("#title").type("Test Blog 2");
		cy.get("#author").type("Test Author 2");
		cy.get("#url").type("Test URL 2");
		cy.get(".createBlog").click();

		cy.get(".blog").eq(0).should("contain", "Test Blog 2");

		cy.get("button:last").click();

		cy.contains("Likes: 0");
		cy.get("#like-blog-button").click();
		cy.get(".success").contains("You liked Test Blog 2 by Test Author 2");

		cy.get(".blog").within(function () {
			cy.get("button:last").click();
			cy.get(".finalBlog:first").within(function () {
				cy.contains("Title: Test Blog 2");
				cy.contains("Likes: 1");
			});
			cy.get(".finalBlog:last").contains("Title: Test Blog 1 ");
		});
	});
});
