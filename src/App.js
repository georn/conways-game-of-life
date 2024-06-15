import React, { useState } from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  const [running, setRunning] = useState(false);

  const toggleRunning = () => {
    setRunning(!running);
  };

  const resetGrid = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>
      <div className="App-content">
        <div className="Button-container">
          <button onClick={toggleRunning}>
            {running ? 'Stop' : 'Start'}
          </button>
          <button onClick={resetGrid}>
            Reset
          </button>
        </div>
        <Grid rows={5} columns={5} running={running} />
      </div>
    </div>
  );
}

export default App;
