// src/components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ weatherData, unit, toggleUnit }) => {
    const { temp, description, icon } = weatherData;

    return (
        <div className="weather-card">
            <h2>Current Weather</h2>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
            <p>{description}</p>
            <h3>{unit === 'metric' ? `${temp} °C` : `${temp} °F`}</h3>
            <button onClick={toggleUnit}>
                {unit === 'metric' ? 'Convert to Fahrenheit' : 'Convert to Celsius'}
            </button>
        </div>
    );
};

export default WeatherCard;
