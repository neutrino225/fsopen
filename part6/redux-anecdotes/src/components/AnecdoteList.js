/** @format */

import { useSelector, useDispatch } from "react-redux";
import { voteAnectode } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, vote }) => {
	return (
		<div style={{ marginTop: "10px", boxShadow: "0 8px 6px -6px #ababab" }}>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button style={{ margin: "5px" }} onClick={() => vote(anecdote.id)}>
					vote
				</button>
			</div>
		</div>
	);
};

const AnecdotesList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);

	const filter = useSelector((state) => state.filter);

	const dispatch = useDispatch();

	const anecdotesSorted = [...anecdotes].sort((a, b) => b.votes - a.votes);

	const vote = (id) => {
		// anectodeService.incrementVote(id);

		const anecdoteToVote = anecdotes.find((a) => a.id === id);
		dispatch(voteAnectode(id));

		dispatch(setNotification(`Voted "${anecdoteToVote.content}"`, 5000));
	};

	return anecdotesSorted
		.filter((a) => {
			return a.content.toLowerCase().includes(filter.toLowerCase());
		})
		.map((a) => <Anecdote anecdote={a} vote={vote} key={a.id} />);
};

export default AnecdotesList;
