/** @format */

import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
	];

	const Header = () => {
		return <h1>Anectode of the day</h1>;
	};

	const Max = () => {
		return <h1>Anectode with most votes</h1>;
	};

	const Button = (props) => {
		return <button onClick={props.onClick}>{props.text}</button>;
	};

	const AnectodeToDisplay = ({ selected }) => {
		return (
			<p>
				{anecdotes[selected]} {points[selected]} votes
			</p>
		);
	};

	const MostLiked = ({ maxindex }) => {
		return (
			<p>
				{anecdotes[maxindex]} {points[maxindex]} votes
			</p>
		);
	};

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(new Uint16Array(anecdotes.length));

	const maxindex = points.indexOf(Math.max(...points));

	return (
		<div>
			<Header />
			<AnectodeToDisplay selected={selected} />
			<Button
				onClick={() => {
					const copy = [...points];
					copy[selected]++;

					setPoints(copy);
				}}
				text={"vote"}
			/>
			<Button
				onClick={() =>
					setSelected(Math.floor(Math.random() * anecdotes.length))
				}
				text={"next anectode"}
			/>
			<Max />
			<MostLiked maxindex={maxindex} />
		</div>
	);
};

export default App;
