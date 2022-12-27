/** @format */
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import AnecdotesList from "./components/AnecdoteList";
import NewAnectode from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

import { initializeAnectodes } from "./reducers/anecdoteReducer";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeAnectodes());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter />
			<Notification />
			<AnecdotesList />
			<NewAnectode />
		</div>
	);
};

export default App;
