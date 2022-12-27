/** @format */

import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (newObject) => {
	return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (person) => {
	const id = person.id;

	return axios.delete(`${baseUrl}/${id}`);
};

const db = {
	getAll,
	create,
	update,
	deletePerson,
};

export default db;
