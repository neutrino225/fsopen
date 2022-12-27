/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Img = ({ weatherData }) => {
	if (weatherData) {
		console.log(weatherData);
		return (
			<img
				src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
				alt={"weather"}
			/>
		);
	}
};

const Weather = ({ country, apikey }) => {
	// 2459115 is New York City
	const lat = country.capitalInfo.latlng[0];
	const lng = country.capitalInfo.latlng[1];

	const [isLoading, setIsLoading] = useState(true);
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		setIsLoading(true);

		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apikey}`
			)
			.then((res) => {
				setWeatherData(res.data);
			})
			.catch((e) => {
				// Handle error loading here
				console.log("There was an error fetching data");
			})
			.then(() => {
				// Always executed
				setIsLoading(false);
			});
	}, [lat, lng, apikey]);

	if (isLoading) {
		return <p>One moment please. Fetching data...</p>;
	}
	// Done loading
	return (
		<div>
			<h1>Weather in {country.name.common}</h1>
			<p>temperature: {weatherData.main.temp}</p>
			<Img weatherData={weatherData} />
			<p>wind: {weatherData.wind.speed}</p>
		</div>
	);
};

export default Weather;
