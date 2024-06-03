// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './App.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [unit, setUnit] = useState('metric');

    const API_KEY = 'c7be0ad81e30ed963b62774b7f44dc20';  

    const fetchWeather = async (query) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${API_KEY}`);
            setWeatherData({
                temp: response.data.main.temp,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
            });
            setError('');
        } catch (err) {
            setError('Unable to fetch weather data. Please try again.');
            setWeatherData(null);
        }
    };

    const fetchWeatherByLocation = async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`);
            setWeatherData({
                temp: response.data.main.temp,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
            });
            setError('');
        } catch (err) {
            setError('Unable to fetch weather data. Please try again.');
            setWeatherData(null);
        }
    };

    const handleSearch = () => {
        if (location) {
            fetchWeather(location);
        }
    };

    const handleGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
            },
            () => {
                setError('Geolocation not enabled or supported.');
            }
        );
    };

    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    };

    useEffect(() => {
        if (weatherData) {
            fetchWeather(location);
        }
    }, [unit]);

    return (
        <div className={`app ${ weatherData && weatherData.temp >  25 ? 'sunny': 'app'}`}>
            <h1>Weather App</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter city or zip code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleGeolocation}>Use My Location</button>
            </div>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <WeatherCard
                    weatherData={weatherData}
                    unit={unit}
                    toggleUnit={toggleUnit}
                />
            )}
        </div>
 
    )
};

export default App;


