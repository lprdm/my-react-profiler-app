import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Questions from './Questions';
import Banner from './Banner';

function App() {
  return (
    <Router>
      <div>
        <h2>Ejemplo CloudWatch Evidently</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Banner</Link>
            </li>
            <li>
              <Link to="/questions">Cuestionario</Link>
            </li>
          </ul>
        </nav>

        <hr />
      <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;