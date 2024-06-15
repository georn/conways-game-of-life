import React, { useState } from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);
  const [newRows, setNewRows] = useState(5);
  const [newColumns, setNewColumns] = useState(5);

  const toggleRunning = () => {
    setRunning(!running);
  };

  const resetGrid = () => {
    window.location.reload();
  };

  const applyDimensions = () => {
    setRows(newRows);
    setColumns(newColumns);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Conway's Game of Life</h1>
      </header>
      <div className="App-content">
        <div className="Controls-and-Buttons">
          <div className="Controls-container">
            <label>
              Rows:
              <input
                type="range"
                min="5"
                max="50"
                value={newRows}
                onChange={(e) => setNewRows(Number(e.target.value))}
              />
              <span>{newRows}</span>
            </label>
            <label>
              Columns:
              <input
                type="range"
                min="5"
                max="50"
                value={newColumns}
                onChange={(e) => setNewColumns(Number(e.target.value))}
              />
              <span>{newColumns}</span>
            </label>
            <button onClick={applyDimensions}>Apply</button>
          </div>
          <div className="Button-container">
            <button onClick={toggleRunning}>
              {running ? 'Stop' : 'Start'}
            </button>
            <button onClick={resetGrid}>
              Reset
            </button>
          </div>
        </div>
        <Grid rows={rows} columns={columns} running={running} />
      </div>
    </div>
  );
}

export default App;
