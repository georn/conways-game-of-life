import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, minmax(0, 1fr));
  grid-template-rows: repeat(${props => props.rows}, minmax(0, 1fr));
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: calc(100vh - 150px);
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => (props.alive ? 'black' : 'white')};
  border: 1px solid #ddd;
`;

const Grid = ({ rows, columns, running }) => {
  const [grid, setGrid] = useState(Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => 0)
  ));

  useEffect(() => {
    setGrid(Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => 0)
    ));
  }, [rows, columns]);

  const updateGrid = useCallback(() => {
    const nextGrid = grid.map((arr) => [...arr]);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        let neighbors = 0;
        const directions = [
          [0, 1], [0, -1], [1, 0], [-1, 0],
          [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];

        directions.forEach(([x, y]) => {
          const newRow = row + x;
          const newCol = col + y;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns) {
            neighbors += grid[newRow][newCol];
          }
        });

        if (grid[row][col] === 1) {
          if (neighbors < 2 || neighbors > 3) {
            nextGrid[row][col] = 0; // Cell dies
          }
        } else if (grid[row][col] === 0) {
          if (neighbors === 3) {
            nextGrid[row][col] = 1; // Cell becomes alive
          }
        }
      }
    }

    setGrid(nextGrid);
  }, [grid, rows, columns]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(updateGrid, 1000);
    return () => clearInterval(interval);
  }, [running, updateGrid]);

  const toggleCellState = (row, col) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (cell ? 0 : 1) : cell
      )
    );
    setGrid(newGrid);
  };

  // Calculate the optimal cell size to fit within the viewport
  const cellSize = `min(calc((100vw - 20px) / ${columns}), calc((100vh - 150px) / ${rows}))`;

  return (
    <GridWrapper rows={rows} columns={columns} style={{ gridAutoRows: cellSize, gridAutoColumns: cellSize }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            alive={cell}
            data-testid={`cell-${rowIndex}-${colIndex}`}
            onClick={() => toggleCellState(rowIndex, colIndex)}
          />
        ))
      )}
    </GridWrapper>
  );
};

export default Grid;
