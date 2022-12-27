/** @format */
import Button from "./Button";

const Form = ({
	handleNewName,
	handleNewNumber,
	addNewPerson,
	newName,
	newNumber,
}) => {
	return (
		<form>
			<div>
				name: <input onChange={handleNewName} value={newName} />
			</div>
			<div>
				number: <input onChange={handleNewNumber} value={newNumber} />
			</div>
			<div>
				<Button onClick={addNewPerson} text={"add"} type={"submit"} />
			</div>
		</form>
	);
};

export default Form;
