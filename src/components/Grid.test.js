import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Grid from './Grid';

jest.useFakeTimers();

describe('Grid component', () => {
  test('renders the grid with correct number of cells', () => {
    const { container } = render(<Grid rows={5} columns={5} running={false} />);
    const cells = container.querySelectorAll('[data-testid^="cell-"]');
    expect(cells.length).toBe(25); // 5x5 grid should have 25 cells
  });

  test('toggles cell state on click', () => {
    const { container } = render(<Grid rows={5} columns={5} running={false} />);
    const cell = container.querySelector('[data-testid="cell-0-0"]');

    // Cell should initially be dead (background-color: #4e5358)
    expect(cell).toHaveStyle('background-color: #4e5358');

    // Simulate a click to toggle the cell state
    fireEvent.click(cell);

    // Cell should now be alive (background-color: #21a1f1)
    expect(cell).toHaveStyle('background-color: #21a1f1');
  });

  test('updates the grid correctly based on rules', async () => {
    const { container } = render(<Grid rows={5} columns={5} running={true} />);
    const cells = container.querySelectorAll('[data-testid^="cell-"]');

    // Toggle some cells to set an initial pattern
    fireEvent.click(cells[0]); // Top-left corner
    fireEvent.click(cells[1]); // Adjacent cell
    fireEvent.click(cells[5]); // Cell below the top-left corner

    // This setup should form a stable 2x2 block pattern in the top-left corner

    // Simulate a state update
    await act(async () => {
      jest.advanceTimersByTime(1000); // Advance the timer to trigger grid update
    });

    // Verify the new state of the grid forms a stable 2x2 block pattern
    expect(cells[0]).toHaveStyle('background-color: #21a1f1'); // Top-left corner should be alive (hover color for alive cells)
    expect(cells[1]).toHaveStyle('background-color: #21a1f1'); // Adjacent cell should be alive (hover color for alive cells)
    expect(cells[5]).toHaveStyle('background-color: #21a1f1'); // Cell below the top-left corner should be alive (hover color for alive cells)
    expect(cells[6]).toHaveStyle('background-color: #21a1f1'); // Cell at (1, 1) should be alive (hover color for alive cells)
  });


  test('does not update the grid when running is false', () => {
    const { container } = render(<Grid rows={5} columns={5} running={false} />);
    const cells = container.querySelectorAll('[data-testid^="cell-"]');

    // Toggle some cells to set an initial pattern
    fireEvent.click(cells[0]); // Top-left corner
    fireEvent.click(cells[1]); // Adjacent cell
    fireEvent.click(cells[5]); // Cell below the top-left corner

    // Simulate a state update
    act(() => {
      jest.advanceTimersByTime(1000); // Advance the timer to trigger grid update
    });

    // Verify the state of the grid has not changed
    expect(cells[0]).toHaveStyle('background-color: #21a1f1'); // Should still be alive (hover color for alive cells)
    expect(cells[1]).toHaveStyle('background-color: #21a1f1'); // Should still be alive (hover color for alive cells)
    expect(cells[5]).toHaveStyle('background-color: #21a1f1'); // Should still be alive (hover color for alive cells)
    expect(cells[6]).toHaveStyle('background-color: #4e5358'); // Should still be dead (hover color for dead cells)
  });

  test('kills a cell due to underpopulation', async () => {
    const { container } = render(<Grid rows={5} columns={5} running={true} />);
    const cells = container.querySelectorAll('[data-testid^="cell-"]');

    // Toggle some cells to set an initial pattern
    fireEvent.click(cells[0]); // Top-left corner
    fireEvent.click(cells[1]); // Adjacent cell

    // This setup should leave both cells [0, 0] and [0, 1] dead in the next generation due to underpopulation

    // Simulate a state update
    await act(async () => {
      jest.advanceTimersByTime(1000); // Advance the timer to trigger grid update
    });

    // Verify the new state of the grid
    expect(cells[0]).toHaveStyle('background-color: #4e5358'); // Should be dead (hover color for dead cells)
    expect(cells[1]).toHaveStyle('background-color: #4e5358'); // Should be dead (hover color for dead cells)
  });

  test('kills a cell due to overpopulation', async () => {
    const { container } = render(<Grid rows={5} columns={5} running={true} />);
    const cells = container.querySelectorAll('[data-testid^="cell-"]');

    // Toggle some cells to set an initial pattern
    fireEvent.click(cells[6]); // Center cell at (1, 1)
    fireEvent.click(cells[7]); // Adjacent cell
    fireEvent.click(cells[11]); // Cell below the center
    fireEvent.click(cells[5]); // Cell left of the center
    fireEvent.click(cells[10]); // Cell above the center

    // This setup should kill cell [1, 1] due to overpopulation

    // Simulate a state update
    await act(async () => {
      jest.advanceTimersByTime(1000); // Advance the timer to trigger grid update
    });

    // Verify the new state of the grid
    expect(cells[6]).toHaveStyle('background-color: #4e5358'); // Should be dead (hover color for dead cells)
    expect(cells[7]).toHaveStyle('background-color: #21a1f1'); // Should be alive (hover color for alive cells)
    expect(cells[11]).toHaveStyle('background-color: #4e5358'); // Should be dead (hover color for dead cells)
    expect(cells[5]).toHaveStyle('background-color: #21a1f1'); // Should be alive (hover color for alive cells)
    expect(cells[10]).toHaveStyle('background-color: #21a1f1'); // Should be alive (hover color for alive cells)
  });
});
