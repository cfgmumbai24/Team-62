import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tile from './components/Tile'; // Assuming Tile is located here
// Import Std component
import Std from './components/Std';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/std" element={<Std/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
