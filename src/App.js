import React, { useState, useRef } from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);
  const [newRows, setNewRows] = useState(5);
  const [newColumns, setNewColumns] = useState(5);
  const gridRef = useRef();

  const toggleRunning = () => {
    if (!running && gridRef.current) {
      gridRef.current.initializeGridIfEmpty();
    }
    setRunning(!running);
  };

  const resetGrid = () => {
    window.location.reload();
  };

  const applyDimensions = () => {
    setRows(newRows);
    setColumns(newColumns);
  };

  const handleGridEmpty = () => {
    setRunning(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Conway's Game of Life</h1>
      </header>
      <div className="App-content">
        <Grid
          ref={gridRef}
          rows={rows}
          columns={columns}
          running={running}
          onEmpty={handleGridEmpty}
        />
        <div className="Controls-and-Buttons">
          <div className="Controls-container">
            <label>
              Rows: {newRows}
              <input
                type="range"
                min="5"
                max="50"
                value={newRows}
                onChange={(e) => setNewRows(Number(e.target.value))}
              />
            </label>
            <label>
              Columns: {newColumns}
              <input
                type="range"
                min="5"
                max="50"
                value={newColumns}
                onChange={(e) => setNewColumns(Number(e.target.value))}
              />
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
      </div>
    </div>
  );
}

export default App;
