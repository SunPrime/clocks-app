import { useState, useEffect, useRef, useCallback } from 'react';
import cities from '../data/cities.json';

export const useTimeSync = () => {
  const [selectedZones, setSelectedZones] = useState(() => {
    try {
      const saved = localStorage.getItem("timesync_zones");
      return saved ? JSON.parse(saved) : { left: cities[0], right: cities[4] };
    } catch {
      return { left: cities[0], right: cities[4] };
    }
  });

  const calculateAllTimes = useCallback((baseDate, zones) => {
    const formatter = (zone) => new Date(baseDate.toLocaleString("en-US", { timeZone: zone }));
    return {
      left: formatter(zones.left.zone),
      kyiv: formatter("Europe/Kyiv"),
      right: formatter(zones.right.zone),
    };
  }, []);

  const [times, setTimes] = useState(() => calculateAllTimes(new Date(), selectedZones));
  const [input, setInput] = useState("");
  const [isCustomTime, setIsCustomTime] = useState(false);
  const currentTimeRef = useRef(new Date());

  useEffect(() => {
    localStorage.setItem("timesync_zones", JSON.stringify(selectedZones));
  }, [selectedZones]);

  useEffect(() => {
    const updateTime = () => {
      const nextDate = isCustomTime
        ? new Date(currentTimeRef.current.getTime() + 1000)
        : new Date();

      currentTimeRef.current = nextDate;
      setTimes(calculateAllTimes(nextDate, selectedZones));
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isCustomTime, selectedZones, calculateAllTimes]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (!val) return;
    setInput(val);

    const [h, m] = val.split(":").map(Number);
    const newTime = new Date();
    newTime.setHours(h, m, 0, 0);

    currentTimeRef.current = newTime;
    setIsCustomTime(true);
    setTimes(calculateAllTimes(newTime, selectedZones));
  };

  const reset = () => {
    setIsCustomTime(false);
    setInput("");
    const now = new Date();
    currentTimeRef.current = now;
    setTimes(calculateAllTimes(now, selectedZones));
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