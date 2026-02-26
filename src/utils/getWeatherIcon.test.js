import { describe, it, expect } from 'vitest';
import getWeatherIcon from './getWeatherIcon.js';

describe('getWeatherIcon utility', () => {
  it('returns sun for code 0 during day', () => {
    expect(getWeatherIcon(0, true)).toBe("☀️");
  });

  it('returns moon for code 0 during night', () => {
    expect(getWeatherIcon(0, false)).toBe("🌙");
  });

  it('returns cloud for code 3 regardless of day/night', () => {
    expect(getWeatherIcon(3, true)).toBe("☁️");
    expect(getWeatherIcon(3, false)).toBe("☁️");
  });

  it('returns rain icon for rain codes', () => {
    expect(getWeatherIcon(61, true)).toBe("🌧️");
    expect(getWeatherIcon(63, false)).toBe("🌧️");
  });

  it('returns snow icon for snow codes', () => {
    expect(getWeatherIcon(71, true)).toBe("❄️");
  });

  it('returns lightning for thunderstorm code 95', () => {
    expect(getWeatherIcon(95, true)).toBe("⚡");
  });

  it('returns fallback icon for unknown code', () => {
    expect(getWeatherIcon(999, true)).toBe("☀️");
    expect(getWeatherIcon(999, false)).toBe("🌙");
  });
});