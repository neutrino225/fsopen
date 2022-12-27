/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const Flag = ({ path, alt }) => {
	return <img src={path} alt={alt} />;
};

const Country = ({ country }) => {
	const imgPath = country.flags.png;

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>
				<p>Capital: {country.capital[0]}</p>
				<p>Area: {country.area}</p>
			</div>
			<div>
				<h3>Languages:</h3>
				<ul>
					{Object.entries(country.languages).map(([k, language]) => {
						return <li key={k}>{language}</li>;
					})}
				</ul>
				<div>
					<Flag path={imgPath} alt={"Flag"} />
				</div>
				<Weather
					country={country}
					apikey={process.env.REACT_APP_WEATHER_API_KEY}
				/>
			</div>
		</div>
	);
};

const App = () => {
	const [countires, setCountries] = useState([]);
	const [filter, setFilter] = useState("");

	const handleFilter = (event) => {
		event.preventDefault();
		console.log(event.target.value);
		setFilter(event.target.value);
	};

	useEffect(() => {
		axios
			.get("https://restcountries.com/v3.1/all")
			.then(console.log("Date retrieved"))
			.then((response) => {
				setCountries(response.data);
			});
	}, []);

	// const handleClick = (country) => {
	// 	setFilter()
	// };

	const filteredCountries = countires.filter((c) =>
		c.name.common.toLowerCase().includes(filter.toLowerCase())
	);

	const Filter = ({ filteredCountries }) => {
		if (filteredCountries.length === 1) {
			return <Country country={filteredCountries[0]} />;
		} else if (filteredCountries.length <= 10) {
			return filteredCountries.map((c) => {
				return (
					<p key={c.name.common}>
						{c.name.common}{" "}
						{<Button onClick={() => setFilter(c.name.common)} text={"show"} />}
					</p>
				);
			});
		} else {
			return <p>Too many matches, be more specific</p>;
		}
	};

	return (
		<div>
			<h1>Countires</h1>

			<div>
				Search: <input onChange={handleFilter} value={filter} />
			</div>

			<div>
				<Filter filteredCountries={filteredCountries} />
			</div>

			<div>
				<p>----------------------------------</p>
				<p>
					Total number of countires: <strong>{countires.length}</strong>
				</p>
			</div>
		</div>
	);
};

export default App;
