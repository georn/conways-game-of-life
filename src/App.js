import React, { useState } from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  const [running, setRunning] = useState(false);

  const toggleRunning = () => {
    setRunning(!running);
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
          <button onClick={() => window.location.reload()}>
            Reset
          </button>
        </div>
        <Grid rows={20} columns={20} running={running} />
      </div>
    </div>
  );
}

export default App;
