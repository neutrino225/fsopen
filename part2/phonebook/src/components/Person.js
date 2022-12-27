/** @format */
import Button from "./Button";
import personService from "../services/persons";

const Person = ({ persons, removePerson }) => {
	return persons.map((person) => {
		return (
			<p key={person.id}>
				{person.name} {person.number}{" "}
				<Button
					onClick={() => {
						if (window.confirm(`Do you really want to delete ${person.name}`)) {
							personService
								.deletePerson(person)
								.then(() => {
									removePerson(person.id);
								})
								.catch(console.error);
						}
					}}
					text={"delete"}
				/>
			</p>
		);
	});
};

export default Person;

// [
// 	{
// 	  "name": "Arto Hellas",
// 	  "number": "040-123456",
// 	  "id": 1
// 	},
// 	{
// 	  "name": "Ada Lovelace",
// 	  "number": "39-44-5323523",
// 	  "id": 2
// 	},
// 	{
// 	  "name": "Dan Abramov",
// 	  "number": "12-43-234345",
// 	  "id": 3
// 	},
// 	{
// 	  "name": "Mary Poppendieck",
// 	  "number": "39-23-6423122",
// 	  "id": 4
// 	}
//   ]
