import React, { useState } from 'react';
import axios from "axios";


export function WeatherElement() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState("");
    const [loaded, setLoaded] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        let apiKey = "094780c710fa4efd669f0df8c3991927";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(showWeather);
    } 
    function showWeather(response) {
        setLoaded(true);
        setWeather({
            temperature:response.data.main.temp,
            wind:response.data.wind.speed,
            humidity:response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            description:response.data.weather[0].description,

        });
    }
    function updateSearch(event) {
        setSearch(event.target.value)
    }
    let form = (
        <form className="search-form" onSubmit={handleSubmit}>
            <input className='input' type="search" placeholder="Enter a city.." onChange={updateSearch} />
            <input className='submit' type="submit" value="search" />
        </form>
    )
    if(loaded) {
        return (
            <div>
                {form}
                <ul className='ul'>
              <li>Temperature: {Math.round(weather.temperature)}°C</li>
              <li>Description: {weather.description}</li>
              <li>Humidity: {weather.humidity}%</li>
              <li>Wind: {weather.wind}km/h</li>
              <li>
                <img src={weather.icon} alt={weather.description} />
              </li>
            </ul>
            </div>
        )
    }else {
        return form;
    }
    
}