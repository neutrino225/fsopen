/** @format */
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3001/courses")
			.then(console.log("Data retrieved"))
			.then((response) => {
				console.log(response.data);
				setCourses(response.data);
			});
	}, []);

	return (
		<div>
			{courses.map((course) => {
				return <Course course={course} key={course.id} />;
			})}
		</div>
	);
};

const Course = ({ course }) => {
	const total = course.parts.reduce(
		(partialSum, e) => partialSum + e.exercises,
		0
	);
	return (
		<>
			<h1>{course.name}</h1>
			{course.parts.map((e) => {
				return (
					<p key={e.id}>
						{e.name} {e.exercises}
					</p>
				);
			})}
			<p>
				<strong>total of {total} exercises</strong>
			</p>
		</>
	);
};

export default App;
