import React from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import Input from "../component/input.jsx";
import Weather from "../component/weather.jsx";
import cities from "../data/cities.json";
import { useTimeSync } from "../hooks/useTimeSync";
import themeConfig from "../config/themeConfig";

const Main = () => {
  const {
    times, selectedZones, isCustomTime, input,
    handleInput, reset, changeCity, getDayNightInfo
  } = useTimeSync();

  const slots = [
    { id: 'kyiv', data: { label: "Kyiv" }, time: times.kyiv, canChange: false },
    { id: 'left', data: selectedZones.left, time: times.left, canChange: true },
    { id: 'right', data: selectedZones.right, time: times.right, canChange: true },
  ];

  return (
    <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col justify-center">
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-2 bg-white/70 p-1.5 rounded-[2rem] shadow-xl shadow-indigo-100/40 border border-white backdrop-blur-sm">
          <button
            onClick={reset}
            className={`px-6 py-2.5 rounded-[1.5rem] font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              !isCustomTime ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {!isCustomTime ? "Real-time" : "Go Live"}
          </button>
          <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>
          <div className="flex items-center gap-3 px-3">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 hidden sm:inline">Set Time</span>
            <Input value={input} onChange={handleInput} variant="minimal" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {slots.map((slot) => {
          const { icon, isDay } = getDayNightInfo(slot.time);
          const cardStyle = `${themeConfig.card.base} ${isDay ? themeConfig.card.day : themeConfig.card.night}`;
          const titleStyle = `${themeConfig.text.title} ${isDay ? themeConfig.text.titleDay : themeConfig.text.titleNight}`;
          const selectStyle = `bg-transparent appearance-none border-none outline-none cursor-pointer transition-colors text-center py-1 ${themeConfig.text.title} ${isDay ? themeConfig.text.selectDay : themeConfig.text.selectNight}`;

          return (
            <div key={slot.id} className={cardStyle}>
              {!isDay && <div className={themeConfig.effects.nightGlow}></div>}

              <div className="w-full flex flex-col items-center z-10">
                {slot.canChange ? (
                  <div className="relative">
                    <select
                      value={slot.data.label}
                      onChange={(e) => changeCity(slot.id, e.target.value)}
                      className={selectStyle}>
                      {cities.map(city => <option key={city.label} value={city.label}>{city.label}</option>)}
                    </select>
                    <div className={`absolute -right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] ${isDay ? 'text-slate-300' : 'text-slate-500'}`}>▼</div>
                  </div>
                ) : (
                  <h3 className={titleStyle}>{slot.data.label}</h3>
                )}
                <div className="text-xl mt-2 filter drop-shadow-sm">{icon}</div>
              </div>

              <div className={`relative flex-grow flex items-center justify-center ${isDay ? "" : "dark-clock"}`}>
                <Clock value={slot.time} size={180} renderNumbers={true} />
              </div>

              <div className="w-full mt-2 pt-4 border-t border-white/10">
                <Weather city={slot.data.label} isDay={isDay} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Main;