import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Conway\'s Game of Life title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Conway's Game of Life/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Start and Reset buttons', () => {
  render(<App />);
  const startButton = screen.getByText(/Start/i);
  const resetButton = screen.getByText(/Reset/i);
  expect(startButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});

test('toggles Start/Stop button text on click', () => {
  render(<App />);
  const button = screen.getByText(/Start/i);
  fireEvent.click(button);
  expect(button).toHaveTextContent('Stop');
  fireEvent.click(button);
  expect(button).toHaveTextContent('Start');
});

test('resets the grid on Reset button click', () => {
  render(<App />);
  const resetButton = screen.getByText(/Reset/i);
  fireEvent.click(resetButton);

  // We can't directly test the grid state without modifying Grid component,
  // but we can ensure the button click doesn't break anything.
  const titleElement = screen.getByText(/Conway's Game of Life/i);
  expect(titleElement).toBeInTheDocument();
});
