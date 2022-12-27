/** @format */

import { useState } from "react";

const Header = () => {
	return (
		<>
			<h1>give feedback</h1>
		</>
	);
};

const Button = (props) => {
	return (
		<>
			<button onClick={props.onClick}>{props.text}</button>
		</>
	);
};

const StatisticLine = (props) => {
	return (
		<p>
			{props.text} {props.value}
		</p>
	);
};

const Stat = () => {
	return <h1>Statistics</h1>;
};

const Statistics = ({ good, neutral, bad }) => {
	if (good === 0 && bad === 0 && neutral === 0) return <p>No feedback given</p>;
	return (
		<table>
			<tbody>
				<tr>
					<td>
						<StatisticLine text={"good"} value={good} />
					</td>
				</tr>
				<tr>
					<td>
						<StatisticLine text={"neutral"} value={neutral} />
					</td>
				</tr>
				<tr>
					<td>
						{" "}
						<StatisticLine text={"bad"} value={bad} />
					</td>
				</tr>
				<tr>
					<td>
						<StatisticLine
							text={"average"}
							value={(good + bad + neutral) / 3}
						/>
					</td>
				</tr>
				<tr>
					<td>
						<StatisticLine
							text={"positive"}
							value={good / (good + bad + neutral)}
						/>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<Header />
			<Button onClick={() => setGood(good + 1)} text={"good"} />
			<Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
			<Button onClick={() => setBad(bad + 1)} text={"bad"} />
			<Stat />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
