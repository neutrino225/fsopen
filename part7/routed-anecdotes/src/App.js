/** @format */

import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useParams,
	useNavigate,
} from "react-router-dom";

import { useField } from "./hooks";

const Menu = () => {
	const linkStyle = {
		paddingRight: 5,
		margin: "1rem",
		textDecoration: "none",
		color: "blue",
	};
	return (
		<div>
			{/* <a href="#" style={padding}>
				anecdotes
			</a>
			<a href="#" style={padding}>
				create new
			</a>
			<a href="#" style={padding}>
				about
			</a> */}
			<Link style={linkStyle} to="/">
				anecdotes
			</Link>
			<Link style={linkStyle} to="/create">
				create new
			</Link>
			<Link style={linkStyle} to="/about">
				about
			</Link>
		</div>
	);
};

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map((anecdote) => (
				<li
					key={anecdote.id}
					style={{
						textDecoration: "none",
						margin: "10px",
					}}>
					<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
				</li>
			))}
		</ul>
	</div>
);

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an individual person or an
			incident. Occasionally humorous, anecdotes differ from jokes because their
			primary purpose is not simply to provoke laughter but to reveal a truth
			more general than the brief tale itself, such as to characterize a person
			by delineating a specific quirk or trait, to communicate an abstract idea
			about a person, place, or thing through the concrete details of a short
			narrative. An anecdote is "a story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes, at this app you can
			find the best and add more.
		</p>
	</div>
);

const Footer = () => (
	<div style={{ marginTop: 50 }}>
		Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
		See{" "}
		<a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
			https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
		</a>{" "}
		for the source code.
	</div>
);

const Anecdote = ({ anecdotes }) => {
	const id = useParams().id;

	const anecdote = anecdotes.find((a) => a.id === Number(id));

	return (
		<div>
			<h2>{anecdote.content}</h2>
			<p>has {anecdote.votes} votes</p>
			<p>
				for more info see{" "}
				<a href={anecdote.info} target="_blank" rel="noreferrer">
					{anecdote.info}
				</a>
			</p>
		</div>
	);
};

const CreateNew = ({ addNew }) => {
	const navigate = useNavigate();

	const content = useField("text");
	const author = useField("text");
	const info = useField("info");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (content.value !== "" || author.value !== "" || info.value !== "") {
			addNew({
				content: content.value,
				author: author.value,
				info: info.value,
				votes: 0,
			});
		}

		navigate("/");
	};

	const paddingInputs = { marginLeft: 10 };

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input
						name="content"
						type={content.type}
						value={content.value}
						onChange={content.onChange}
						style={paddingInputs}
					/>
				</div>
				<div>
					author
					<input
						name="author"
						type={author.type}
						value={author.value}
						style={paddingInputs}
						onChange={author.onChange}
					/>
				</div>
				<div>
					url for more info
					<input
						name="info"
						style={paddingInputs}
						type={info.type}
						value={info.value}
						onChange={info.onChange}
					/>
				</div>
				<button style={{ margin: 5 }}>create</button>
				<button
					style={{ margin: 5 }}
					type="button"
					onClick={() => {
						content.reset();
						author.reset();
						info.reset();
					}}>
					reset
				</button>
			</form>
		</div>
	);
};

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: "If it hurts, do it more often",
			author: "Jez Humble",
			info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
			votes: 0,
			id: 1,
		},
		{
			content: "Premature optimization is the root of all evil",
			author: "Donald Knuth",
			info: "http://wiki.c2.com/?PrematureOptimization",
			votes: 0,
			id: 2,
		},
	]);

	const [notification, setNotification] = useState("");

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000);
		setAnecdotes(anecdotes.concat(anecdote));

		setNotification(`a new anecdote ${anecdote.content} created!`);

		setTimeout(() => {
			setNotification("");
		}, 5000);
	};

	// const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	// const vote = (id) => {
	// 	const anecdote = anecdoteById(id);

	// 	const voted = {
	// 		...anecdote,
	// 		votes: anecdote.votes + 1,
	// 	};

	// 	setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	// };

	return (
		<Router>
			<div>
				<h1>Software anecdotes</h1>
				<Menu />

				<p>{notification}</p>

				<Routes>
					<Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
					<Route
						path="/anecdotes/:id"
						element={<Anecdote anecdotes={anecdotes} />}
					/>
					<Route path="/create" element={<CreateNew addNew={addNew} />} />
					<Route path="/about" element={<About />} />
				</Routes>

				<Footer />
			</div>
		</Router>
	);
};

export default App;
