import {render, screen, waitFor} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import Weather from './weather';

describe('Weather Component - Total Coverage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.spyOn(console, 'error').mockImplementation(() => {
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders skeleton for both Day and Night to cover all CSS branches', () => {
    const {rerender} = render(<Weather city="Kyiv" isDay={true}/>);
    const daySkeleton = screen.getByTestId('weather-skeleton');
    expect(daySkeleton.querySelector('.bg-slate-200')).toBeInTheDocument();

    rerender(<Weather city="Kyiv" isDay={false}/>);
    const nightSkeleton = screen.getByTestId('weather-skeleton');

    expect(nightSkeleton.querySelector('.bg-white\\/10')).toBeInTheDocument();
  });

  it('covers transition and theme classes (Day/Night & Loaded)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{latitude: 0, longitude: 0}],
        current_weather: {temperature: 20, weathercode: 0, windspeed: 5}
      }),
    }));

    const {rerender} = render(<Weather city="Kyiv" isDay={true}/>);

    const dayContainer = (await screen.findByText(/20°C/)).closest('.mt-6');

    expect(dayContainer).toHaveClass('opacity-100', 'translate-y-0', 'text-slate-600');

    rerender(<Weather city="Kyiv" isDay={false}/>);

    await waitFor(() => {
      const nightContainer = screen.getByText(/20°C/).closest('.mt-6');
      expect(nightContainer).toHaveClass('text-white');
    });
  });

  it('covers skeleton styles and data loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({results: [{latitude: 50, longitude: 30}]}),
    });
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current_weather: {temperature: 20, weathercode: 0, windspeed: 5}
      }),
    });

    const {rerender} = render(<Weather city="Kyiv" isDay={true}/>);

    expect(screen.getByTestId('weather-skeleton')).toBeInTheDocument();

    const temp = await screen.findByText(/20°C/i, {}, {timeout: 3000});
    expect(temp).toBeInTheDocument();

    rerender(<Weather city="Kyiv" isDay={false}/>);
    expect(await screen.findByText('🌙')).toBeInTheDocument();
  });

  it('renders full weather data after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({results: [{latitude: 50, longitude: 30}]}),
    });
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current_weather: {temperature: 25, weathercode: 0, windspeed: 10}
      }),
    });

    render(<Weather city="Kyiv" isDay={true}/>);

    const tempElement = await screen.findByText(/25°C/i, {}, {timeout: 3000});

    expect(tempElement).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('km/h')).toBeInTheDocument();
  });

  it('covers the case when no geo results are found (Line 20)', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({results: null}),
    });

    render(<Weather city="UnknownPlace" isDay={true}/>);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).not.toHaveBeenCalledWith(expect.stringContaining('forecast'));
  });

  it('handles different types of fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    const {rerender} = render(<Weather city="ErrorCity" isDay={true}/>);

    await waitFor(() => expect(console.error).toHaveBeenCalled());

    const abortError = new Error('Aborted');
    abortError.name = 'AbortError';
    fetch.mockRejectedValueOnce(abortError);

    rerender(<Weather city="NewCity" isDay={true}/>);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});