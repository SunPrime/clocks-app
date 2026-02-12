const getWeatherIcon = (code, isDay) => {
  const icons = {
    // Ясно
    0: isDay ? "☀️" : "🌙",
    // Переважно ясно / хмарно
    1: isDay ? "🌤️" : "☁️",
    2: isDay ? "⛅" : "☁️",
    3: "☁️",
    // Туман
    45: "🌫️",
    48: "🌫️",
    // Мряка
    51: "🌦️",
    53: "🌦️",
    55: "🌦️",
    // Дощ
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    // Сніг
    71: "❄️",
    73: "❄️",
    75: "❄️",
    // Гроза
    95: "⚡",
  };

  return icons[code] || (isDay ? "☀️" : "🌙");
};

export default getWeatherIcon;