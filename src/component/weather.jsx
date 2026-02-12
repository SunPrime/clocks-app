import React, { useState, useEffect } from "react";
import getWeatherIcon from "../utils/weather.jsx";

const Weather = ({ city, isDay }) => {
  const [weather, setWeather] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false); // Скидаємо при зміні міста
    const fetchWeather = async () => {
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();

        if (geoData.results && geoData.results[0]) {
          const { latitude, longitude } = geoData.results[0];
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          const weatherData = await weatherRes.json();

          setWeather(weatherData.current_weather);
          setTimeout(() => setIsLoaded(true), 50);
        }
      } catch (e) {
        console.error("Weather error:", e);
      }
    };
    fetchWeather();
  }, [city]);

  if (!weather || !isLoaded) {
    return (
      <div className="mt-6 flex items-center justify-center gap-4 animate-pulse duration-1000">
        <div className="flex items-center gap-1.5">
          <div className={`w-6 h-6 rounded-full ${isDay ? 'bg-slate-200' : 'bg-white/10'}`}></div>
          <div className={`w-10 h-5 rounded-md ${isDay ? 'bg-slate-200' : 'bg-white/10'}`}></div>
        </div>
        <div className={`w-[1px] h-4 ${isDay ? 'bg-slate-100' : 'bg-white/5'}`}></div>
        <div className="flex items-center gap-1">
          <div className={`w-4 h-4 rounded-full ${isDay ? 'bg-slate-100' : 'bg-white/5'}`}></div>
          <div className={`w-8 h-4 rounded-md ${isDay ? 'bg-slate-100' : 'bg-white/5'}`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-6 flex items-center justify-center gap-4 transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${isDay ? 'text-slate-600' : 'text-white'}`}>
      <div className="flex items-center gap-1.5">
        <span className="text-xl filter drop-shadow-sm">{getWeatherIcon(weather.weathercode, isDay)}</span>
        <span className="text-lg font-bold tracking-tight">{Math.round(weather.temperature)}°C</span>
      </div>

      <div className={`w-[1px] h-4 ${isDay ? 'bg-slate-200' : 'bg-white/20'}`}></div>

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