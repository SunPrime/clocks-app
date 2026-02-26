import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './header';

describe('Header Component', () => {
  it('renders the logo text "TimeSync"', () => {
    render(<Header />);
    expect(screen.getByText('TimeSync')).toBeInTheDocument();
  });

  it('renders the logo icon with initial "T"', () => {
    render(<Header />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('has correct layout classes for sticky positioning', () => {
    const { container } = render(<Header />);
    const headerElement = container.querySelector('header');

    expect(headerElement).toHaveClass('sticky');
    expect(headerElement).toHaveClass('top-0');
  });

  it('is accessible via aria-label', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toHaveAttribute('aria-label', 'Site Header');
  });
});