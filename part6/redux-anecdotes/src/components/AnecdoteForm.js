/** @format */

import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const NewAnectode = (props) => {
	const addAnectode = async (event) => {
		event.preventDefault();

		const content = event.target.newAnectode.value;
		event.target.newAnectode.value = "";

		props.createAnecdote(content);

		props.setNotification(`Added "${content}"`, 5000);
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnectode}>
				<div>
					<input name="newAnectode" />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

const mapDispatchToProps = {
	createAnecdote,
	setNotification,
};

const ConnectedAnectodeForm = connect(null, mapDispatchToProps)(NewAnectode);

export default ConnectedAnectodeForm;
