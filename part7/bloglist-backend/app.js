/** @format */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const blogsRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const commentsRouter = require("./controllers/comments");

const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const config = require("./utils/config");

const app = express();

// Connect to MongoDB
mongoose
	.connect(config.MONGO_URI)
	.then(() => {
		logger.info("Connected to MongoDB");
	})
	.catch((err) => {
		logger.error(err);
	});

app.use(cors());
// app.use(express.static("build")); // Serve static files from the build folder
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

// Routes
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/comments", commentsRouter);

if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

/// To run the app, run the following command:
// app.listen(config.PORT, "0.0.0.0", () => {
// 	logger.info(`Server running on port ${config.PORT}`);
// });

module.exports = app;
