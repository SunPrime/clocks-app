import React, { useState, useEffect, useRef } from "react";
import Clock from "react-clock";
import Input from "../../component/input/input";
import "react-clock/dist/Clock.css";

const Main = () => {
  const [times, setTimes] = useState(() => ({
    london: new Date(),
    kyiv: new Date(),
    kathmandu: new Date(),
  }));
  const [input, setInput] = useState("");
  const [isCustomTime, setIsCustomTime] = useState(false);
  const currentTimeRef = useRef(new Date());

  const getZoneTimes = (baseDate) => {
    const formatter = (zone) => new Date(baseDate.toLocaleString("en-US", { timeZone: zone }));
    return {
      london: formatter("Europe/London"),
      kyiv: formatter("Europe/Kiev"),
      kathmandu: formatter("Asia/Kathmandu"),
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextDate = isCustomTime ? new Date(currentTimeRef.current.getTime() + 1000) : new Date();
      currentTimeRef.current = nextDate;
      setTimes(getZoneTimes(nextDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCustomTime]);

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

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-center mb-20">
        {/* Єдина капсула для всіх елементів керування */}
        <div className="inline-flex items-center gap-2 bg-white/60 p-2 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-white backdrop-blur-sm">

          {/* Кнопка тепер частина капсули */}
          <button
            onClick={reset}
            className={`px-8 py-3 rounded-[2rem] font-bold text-sm tracking-wide transition-all duration-300 ${
              !isCustomTime
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {!isCustomTime ? "Real-time Active" : "Switch to Real-time"}
          </button>

          <div className="w-[1px] h-8 bg-slate-200/60 mx-1"></div>

          <div className="flex items-center gap-3 px-4 py-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Set Custom</span>
            <Input
              value={input}
              onChange={handleInput}
              variant="minimal"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "London", time: times.london },
          { label: "Kyiv", time: times.kyiv, isPrimary: true },
          { label: "Kathmandu", time: times.kathmandu },
        ].map((zone) => (
          <div key={zone.label} className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/40 flex flex-col items-center justify-center min-h-[400px] transition-all hover:translate-y-[-5px]">
            <h3 className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12 italic">
              {zone.label}
            </h3>

            <div className="relative group">
              {/* Світіння навколо годинника для акценту */}
              <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Clock value={zone.time} size={200} renderNumbers={true} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;