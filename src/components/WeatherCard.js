import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
  const { name, sys, main, weather, wind } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <div className="card">
      <h2>{name}, {sys.country}</h2>
      <img src={icon} alt={weather[0].description} />
      <p className="main-weather">{weather[0].main}</p>
      <p className="description">{weather[0].description}</p>
      <p>🌡 Temp: {main.temp}°C</p>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>🌬 Wind: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
