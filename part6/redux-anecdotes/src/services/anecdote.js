/** @format */

import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const getId = () => (100000 * Math.random()).toFixed(0);

const createNew = async (anecdote) => {
	const object = {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
	const response = await axios.post(baseUrl, object);
	return response.data;
};

const incrementVote = async (id) => {
	const all = await getAll();
	let anecdoteToVote = all.find((a) => a.id === id);

	anecdoteToVote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };

	try {
		const response = await axios.put(`${baseUrl}/${id}`, anecdoteToVote);
 
		return response.data;
	} catch (error) {
		console.error(error.message);
	}
};

const exportedObject = {
	getAll,
	createNew,
	incrementVote,
};

export default exportedObject;
