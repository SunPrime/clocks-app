import { useState, useEffect, useRef } from "react";
import cities from "../data/cities.json";

export const useTimeSync = () => {
  const [selectedZones, setSelectedZones] = useState(() => {
    const savedZones = localStorage.getItem("timesync_zones");
    if (savedZones) {
      try { return JSON.parse(savedZones); }
      catch (e) { console.error("Error parsing zones", e); }
    }
    return { left: cities[0], right: cities[4] };
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
      const nextDate = isCustomTime ? new Date(currentTimeRef.current.getTime() + 1000) : new Date();
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
    const newCity = cities.find(c => c.label === cityLabel);
    if (newCity) setSelectedZones(prev => ({ ...prev, [side]: newCity }));
  };

  const getDayNightInfo = (date) => {
    if (!date) return { icon: "☀️", isDay: true };
    const hours = date.getHours();
    const isDay = hours >= 6 && hours < 18;
    return { icon: isDay ? "☀️" : "🌙", isDay };
  };

  return {
    times,
    selectedZones,
    isCustomTime,
    input,
    handleInput,
    reset,
    changeCity,
    getDayNightInfo
  };
};