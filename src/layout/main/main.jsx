import React, { useState, useEffect, useRef } from "react";
import Clock from "react-clock";
import Input from "../../component/input/input";
import cities from "../../data/cities.json";
import "react-clock/dist/Clock.css";

const Main = () => {
  const [selectedZones, setSelectedZones] = useState(() => {
    const savedZones = localStorage.getItem("timesync_zones");
    if (savedZones) {
      try {
        return JSON.parse(savedZones);
      } catch (e) {
        console.error("Error parsing zones from storage", e);
      }
    }

    return {
      left: cities[0],   // London
      right: cities[4],  // Kathmandu
    };
  });

  const calculateAllTimes = (baseDate, zones) => {
    const formatter = (zone) => new Date(baseDate.toLocaleString("en-US", { timeZone: zone }));
    return {
      left: formatter(zones.left.zone),
      kyiv: formatter("Europe/Kiev"),
      right: formatter(zones.right.zone),
    };
  };

  const [times, setTimes] = useState(() => calculateAllTimes(new Date(), selectedZones));
  const [input, setInput] = useState("");
  const [isCustomTime, setIsCustomTime] = useState(false);
  const currentTimeRef = useRef(new Date());

  useEffect(() => {
    localStorage.setItem("timesync_zones", JSON.stringify(selectedZones));
  }, [selectedZones]);

  useEffect(() => {
    if (!isCustomTime) currentTimeRef.current = new Date();

    const interval = setInterval(() => {
      const nextDate = isCustomTime
        ? new Date(currentTimeRef.current.getTime() + 1000)
        : new Date();

      currentTimeRef.current = nextDate;
      setTimes(calculateAllTimes(nextDate, selectedZones));
    }, 1000);

    return () => clearInterval(interval);
  }, [isCustomTime, selectedZones]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (!val) return;
    setInput(val);
    const [h, m] = val.split(":");
    const newTime = new Date();
    newTime.setHours(parseInt(h), parseInt(m), 0);
    currentTimeRef.current = newTime;
    setIsCustomTime(true);
  };

  const reset = () => {
    setIsCustomTime(false);
    setInput("");
  };

  const changeCity = (side, cityLabel) => {
    const newCity = AVAILABLE_CITIES.find(c => c.label === cityLabel);
    setSelectedZones(prev => ({ ...prev, [side]: newCity }));
  };

  const getDayNightInfo = (date) => {
    if (!date) return { icon: "☀️", isDay: true };
    const hours = date.getHours();
    const isDay = hours >= 6 && hours < 18;
    return {
      icon: isDay ? "☀️" : "🌙",
      isDay: isDay
    };
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-center mb-20">
        <div className="inline-flex items-center gap-2 bg-white/60 p-2 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-white backdrop-blur-sm">
          <button
            onClick={reset}
            className={`px-8 py-3 rounded-[2rem] font-bold text-sm tracking-wide transition-all duration-300 ${
              !isCustomTime ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {!isCustomTime ? "Real-time Active" : "Switch to Real-time"}
          </button>
          <div className="w-[1px] h-8 bg-slate-200/60 mx-1"></div>
          <div className="flex items-center gap-3 px-4 py-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Set Custom</span>
            <Input value={input} onChange={handleInput} variant="minimal" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { id: 'kyiv', data: { label: "Kyiv" }, time: times.kyiv, canChange: true},
          { id: 'left', data: selectedZones.left, time: times.left, canChange: true },
          { id: 'right', data: selectedZones.right, time: times.right, canChange: true },
        ].map((slot) => {
          const { icon, isDay } = getDayNightInfo(slot.time);

          return (
            <div key={slot.id} className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/40 flex flex-col items-center justify-center min-h-[400px] transition-all hover:translate-y-[-5px] relative">

              {slot.canChange ? (
                <div className="relative mb-4">
                  <select
                    value={slot.data.label}
                    onChange={(e) => changeCity(slot.id, e.target.value)}
                    className="bg-transparent border-none text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] italic outline-none cursor-pointer hover:text-indigo-600 transition-colors text-center"
                  >
                    {cities.map(city => (
                      <option key={city.label} value={city.label} className="text-slate-900 bg-white capitalize">{city.label}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <h3 className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 italic">
                  {slot.data.label}
                </h3>
              )}

              <div className={`text-2xl mb-4 transition-transform duration-500 hover:scale-125 opacity-80 cursor-default`}>
                {icon}
              </div>

              <div className="relative group">
                <div className={`absolute inset-0 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity ${isDay ? 'bg-orange-400/10' : 'bg-indigo-900/10'}`}></div>
                <Clock value={slot.time} size={200} renderNumbers={true} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Main;