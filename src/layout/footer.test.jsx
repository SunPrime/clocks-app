import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './footer';
import { version } from '../../package.json';

describe('Footer Component', () => {
  it('renders the current year correctly', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders the correct version from package.json', () => {
    render(<Footer />);
    expect(screen.getByText(`v${version}`)).toBeInTheDocument();
  });

  it('has a functional link to LinkedIn profile', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /sunprime/i });
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/elenavelytchenko/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('contains the copyright symbol', () => {
    render(<Footer />);
    expect(screen.getByText(/©/i)).toBeInTheDocument();
  });
});