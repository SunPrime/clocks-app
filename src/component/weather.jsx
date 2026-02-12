import React, { useState, useEffect } from "react";
import getWeatherIcon from "../utils/weather.jsx";

const Weather = ({ city, isDay }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();

        if (geoData.results && geoData.results[0]) {
          const { latitude, longitude } = geoData.results[0];
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData.current_weather);
        }
      } catch (e) {
        console.error("Weather error:", e);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <div className="h-6 w-20 bg-slate-200/20 animate-pulse rounded-full mt-6 mx-auto"></div>;

  const icon = getWeatherIcon(weather.weathercode, isDay);

  return (
    <div className={`mt-6 flex items-center justify-center gap-4 ${isDay ? 'text-slate-600' : 'text-white'}`}>
      {/* Температура та основна іконка */}
      <div className="flex items-center gap-1.5">
        <span className="text-xl filter drop-shadow-sm">{icon}</span>
        <span className="text-lg font-bold tracking-tight">{Math.round(weather.temperature)}°C</span>
      </div>

      {/* Більш помітний розділювач */}
      <div className={`w-[1px] h-4 ${isDay ? 'bg-slate-200' : 'bg-white/20'}`}></div>

      {/* Блок вітру з чіткою іконкою */}
      <div className="flex items-center gap-1">
        <span className={`text-sm ${isDay ? 'text-indigo-400' : 'text-indigo-300'}`}>🌬️</span>
        <span className={`text-sm font-semibold ${isDay ? 'text-slate-500' : 'text-indigo-100'}`}>
        {Math.round(weather.windspeed)}
      </span>
        <span className={`text-[9px] font-bold tracking-tighter ${isDay ? 'text-slate-400' : 'text-indigo-300/60'}`}>
        km/h
      </span>
      </div>
    </div>
  );
};

export default Weather;