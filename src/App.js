import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getBackground = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return 'linear-gradient(135deg, #f6d365, #fda085)';
      case 'Clouds':
        return 'linear-gradient(135deg, #d7d2cc, #304352)';
      case 'Rain':
        return 'linear-gradient(135deg, #667db6, #0082c8)';
      case 'Snow':
        return 'linear-gradient(135deg, #83a4d4, #b6fbff)';
      case 'Thunderstorm':
        return 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';
      default:
        return 'linear-gradient(135deg, #00c6ff, #0072ff)';
    }
  };

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="app"
      style={{
        background: weather
          ? getBackground(weather.weather[0].main)
          : 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)' // dark default
      }}
    >
      <h1 className="app-title">🌤 Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getWeather()}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
