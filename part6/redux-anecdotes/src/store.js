/** @format */

import { configureStore } from "@reduxjs/toolkit";

import anectodeReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
	reducer: {
		anecdotes: anectodeReducer,
		notification: notificationReducer,
		filter: filterReducer,
	},
});

export default store;
