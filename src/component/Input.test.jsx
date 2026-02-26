import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './input';

describe('Input Component', () => {
  it('renders default variant correctly', () => {
    render(<Input placeholder="Enter something" />);
    const input = screen.getByPlaceholderText('Enter something');
    expect(input).toHaveClass('bg-slate-100');
    expect(input).not.toHaveClass('text-indigo-600');
  });

  it('renders minimal variant as time input', () => {
    const { container } = render(<Input variant="minimal" value="12:00" onChange={() => {}} />);
    const input = container.querySelector('input');

    expect(input).toHaveAttribute('type', 'time');
    expect(input).toHaveClass('text-indigo-600', 'font-black');
    expect(input.value).toBe('12:00');
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = vi.fn();
    const { container } = render(<Input variant="minimal" onChange={handleChange} />);

    const input = container.querySelector('input[type="time"]');

    fireEvent.change(input, { target: { value: '14:30' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('passes extra attributes correctly', () => {
    render(<Input id="test-input" data-testid="custom-input" />);
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });
});