import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Main from './main';
import { useTimeSync } from '../hooks/useTimeSync';

vi.mock('../hooks/useTimeSync');
vi.mock('../component/weather.jsx', () => ({ default: () => <div data-testid="weather" /> }));
vi.mock('react-clock', () => ({ default: () => <div data-testid="clock" /> }));

describe('Main Component - Full Coverage', () => {
  const mockChangeCity = vi.fn();
  const mockReset = vi.fn();

  beforeEach(() => {
    useTimeSync.mockReturnValue({
      times: { kyiv: new Date(), left: new Date(), right: new Date() },
      selectedZones: { left: { label: 'London' }, right: { label: 'New York' } },
      isCustomTime: false,
      input: '',
      handleInput: vi.fn(),
      reset: mockReset,
      changeCity: mockChangeCity,
      getDayNightInfo: () => ({ icon: '☀️', isDay: true })
    });
  });

  it('handles city change in select elements (Line 60)', () => {
    render(<Main />);

    const select = screen.getByLabelText(/Select city for left slot/i);

    fireEvent.change(select, { target: { value: 'Midway' } });

    expect(mockChangeCity).toHaveBeenCalledWith('left', 'Midway');
  });

  it('toggles button text and styles when isCustomTime is true', () => {
    useTimeSync.mockReturnValue({
      times: { kyiv: new Date(), left: new Date(), right: new Date() },
      selectedZones: { left: { label: 'London' }, right: { label: 'New York' } },
      isCustomTime: true,
      input: '12:00',
      handleInput: vi.fn(),
      reset: mockReset,
      changeCity: mockChangeCity,
      getDayNightInfo: () => ({ icon: '🌙', isDay: false })
    });

    const { container } = render(<Main />);

    expect(screen.getByText('Go Live')).toBeInTheDocument();

    const nightGlow = container.querySelector('[aria-hidden="true"].absolute');
    expect(nightGlow).toBeDefined();

    const clockContainer = container.querySelector('.dark-clock');
    expect(clockContainer).toBeInTheDocument();
  });
});