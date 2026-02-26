import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('./layout/header.jsx', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('./layout/main.jsx', () => ({ default: ({ children }) => <div data-testid="main">{children}</div> }));
vi.mock('./layout/footer.jsx', () => ({ default: () => <footer data-testid="footer" /> }));

describe('App Component', () => {
  it('renders Header, Main and Footer', () => {
    render(<App>Test Content</App>);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders children correctly inside Main', () => {
    render(<App><span data-testid="child">Child Content</span></App>);

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});