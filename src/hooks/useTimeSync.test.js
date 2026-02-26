import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTimeSync } from './useTimeSync';
import cities from '../data/cities.json';

describe('useTimeSync hook - full coverage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('handles localStorage errors in initialization (Line 10)', () => {
    localStorage.setItem("timesync_zones", "invalid-json");

    const { result } = renderHook(() => useTimeSync());
    expect(result.current.selectedZones.left).toEqual(cities[0]);
  });

  it('updates time every second automatically (Real-time mode)', () => {
    const { result } = renderHook(() => useTimeSync());

    const initialTime = result.current.times.kyiv.getTime();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const updatedTime = result.current.times.kyiv.getTime();

    expect(updatedTime).toBeGreaterThanOrEqual(initialTime + 3000);
  });

  it('increments custom time by 1 second (Custom time mode)', () => {
    const { result } = renderHook(() => useTimeSync());

    act(() => {
      result.current.handleInput({ target: { value: '10:00' } });
    });

    const customTimeStart = result.current.times.kyiv.getHours();
    expect(customTimeStart).toBe(10);
    expect(result.current.isCustomTime).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.times.kyiv.getSeconds()).toBe(1);
  });

  it('updates time correctly when a valid time is input', () => {
    const { result } = renderHook(() => useTimeSync());

    act(() => {
      result.current.handleInput({ target: { value: '14:30' } });
    });

    expect(result.current.input).toBe('14:30');

    expect(result.current.isCustomTime).toBe(true);

    expect(result.current.times.kyiv.getHours()).toBe(14);
    expect(result.current.times.kyiv.getMinutes()).toBe(30);
  });

  it('does nothing if the input value is empty (Line: if (!val) return)', () => {
    const { result } = renderHook(() => useTimeSync());

    const initialInput = result.current.input;
    const initialIsCustom = result.current.isCustomTime;

    act(() => {
      result.current.handleInput({ target: { value: '' } });
    });

    expect(result.current.input).toBe(initialInput);
    expect(result.current.isCustomTime).toBe(initialIsCustom);
  });

  it('resets custom time back to real-time mode', () => {
    const {result} = renderHook(() => useTimeSync());

    act(() => {
      result.current.handleInput({target: {value: '20:00'}});
    });

    expect(result.current.isCustomTime).toBe(true);
    expect(result.current.input).toBe('20:00');

    act(() => {
      result.current.reset();
    });

    expect(result.current.isCustomTime).toBe(false);
    expect(result.current.input).toBe("");

    const now = new Date().getHours();
    expect(result.current.times.kyiv.getHours()).toBe(now);
  });

  it('updates city correctly via changeCity (Lines 69-70)', () => {
    const { result } = renderHook(() => useTimeSync());

    act(() => {
      result.current.changeCity('left', cities[2].label);
    });

    expect(result.current.selectedZones.left.label).toBe(cities[2].label);
    expect(localStorage.getItem("timesync_zones")).toContain(cities[2].label);
  });

  it('ignores changeCity if city is not found', () => {
    const { result } = renderHook(() => useTimeSync());
    const initialLabel = result.current.selectedZones.left.label;

    act(() => {
      result.current.changeCity('left', 'NonExistentCity');
    });

    expect(result.current.selectedZones.left.label).toBe(initialLabel);
  });

  it('calculates day/night info correctly (Lines 74-77)', () => {
    const { result } = renderHook(() => useTimeSync());

    const dayDate = new Date();
    dayDate.setHours(12, 0);
    expect(result.current.getDayNightInfo(dayDate)).toEqual({ icon: "☀️", isDay: true });

    const nightDate = new Date();
    nightDate.setHours(23, 0);
    expect(result.current.getDayNightInfo(nightDate)).toEqual({ icon: "🌙", isDay: false });
    expect(result.current.getDayNightInfo(null)).toEqual({ icon: "☀️", isDay: true });
  });

  it('handles empty input in handleInput', () => {
    const { result } = renderHook(() => useTimeSync());

    act(() => {
      result.current.handleInput({ target: { value: '' } });
    });

    expect(result.current.isCustomTime).toBe(false);
  });
});