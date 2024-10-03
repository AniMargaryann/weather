import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather, fetchFiveDayForecast, toggleUnit } from "../../Redux/weatherSlice";
// import './weather.css'

function WeatherApp() {
  const [city, setCity] = useState("Yerevan");
  const dispatch = useDispatch();

  const { currentWeather, forecast, status, error, unit } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchCurrentWeather(city));
    dispatch(fetchFiveDayForecast(city));
  }, [dispatch, city]);


  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchCurrentWeather(city));
    dispatch(fetchFiveDayForecast(city));
  };

  const handleToggle = () => {
    dispatch(toggleUnit());
  };

  return (
    <div className="weather">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <button type="submit">Search</button>
      </form>

      <button onClick={handleToggle}>
        {unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </button>

      {status === 'loading' && <p>Loading... </p>}
      {error && <p>Error: {error}</p>}

      {currentWeather && (
        <div>
          <h2>Weather in {currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
          <p>Weather: {currentWeather.weather[0].description}</p>
        </div>
      )}

      {forecast && (
        <div>
          <h2>5-day Forecast</h2>
          {forecast.list.map((forecastItem, index) => (
            <div key={index}>
              <p>{new Date(forecastItem.dt_txt).toLocaleString()}</p>
              <p>Temp: {forecastItem.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
              <p>{forecastItem.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


console.log(WeatherApp);

export default WeatherApp;
