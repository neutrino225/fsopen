/** @format */

import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		notificationChange(state, action) {
			return action.payload;
		},
	},
});

export const { notificationChange } = notificationSlice.actions;

let timeoutId;

export const setNotification = (message, time) => async (dispatch) => {
	dispatch(notificationChange(message));

	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		dispatch(notificationChange(""));
	}, time);
};
export default notificationSlice.reducer;
