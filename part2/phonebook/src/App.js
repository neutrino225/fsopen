/** @format */

import { useEffect, useState } from "react";
import Form from "./components/Form";

import Person from "./components/Person";
import SearchFilter from "./components/SearchFilter";

import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		personService.getAll().then((repsonse) => {
			setPersons(repsonse.data);
		});
	}, []);

	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [errorState, SetErrorState] = useState(null);

	const filteredPersons = persons.filter((p) =>
		p.name.toLowerCase().includes(filter.toLowerCase())
	);

	const handleNewName = (event) => {
		event.preventDefault();
		setNewName(event.target.value);
	};

	const handleNewNumber = (event) => {
		event.preventDefault();
		setNewNumber(event.target.value);
	};

	const addNewPerson = (event) => {
		event.preventDefault();
		setNewNumber("");
		setNewName("");

		if (newName === undefined || newName === "") {
			setErrorMessage(
				"Person validation failed: name: Path `name` is required."
			);
			SetErrorState(0);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
			return;
		}

		if (newName.length < 3) {
			setErrorMessage("Cant add person with name less than 3 characters");
			SetErrorState(0);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
			return;
		}

		if (newNumber === "" || newNumber === undefined) {
			setErrorMessage(
				"Person validation failed: number: Path `number` is required."
			);
			SetErrorState(0);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
			return;
		}

		const findPerson = persons.find((person) => person.name === newName);
		if (findPerson) {
			SetErrorState(0);
			setErrorMessage(`${findPerson.name} is already added to the phonebook`);

			setTimeout(() => {
				setErrorMessage(null);
				SetErrorState(null);
			}, 5000);
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			};

			personService.create(newPerson).then((response) => {
				setPersons(persons.concat(response.data));
			});

			SetErrorState(1);
			setErrorMessage(`${newPerson.name} added to the phonebook`);

			setTimeout(() => {
				setErrorMessage(null);
				SetErrorState(null);
			}, 5000);
		}
	};

	const handleFilter = (event) => {
		event.preventDefault();
		console.log(event.target.value);
		setFilter(event.target.value);
	};

	const removePerson = (id) => {
		setPersons(persons.filter((p) => p.id !== id));
	};

	return (
		<div>
			<Notification message={errorMessage} state={errorState} />
			<h2>Phonebook</h2>

			<SearchFilter handleFilter={(event) => handleFilter(event)} />

			<h3>Add a new</h3>

			<div>
				<Form
					handleNewName={(event) => handleNewName(event)}
					handleNewNumber={(event) => handleNewNumber(event)}
					addNewPerson={(event) => addNewPerson(event)}
					newName={newName}
					newNumber={newNumber}
				/>
			</div>

			<h3>Numbers</h3>

			<Person persons={filteredPersons} removePerson={removePerson} />
		</div>
	);
};

export default App;
