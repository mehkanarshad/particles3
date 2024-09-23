import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ParticlesComponent from "./components/ParticlesComponent";
import "./App.css";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ParticlesComponent />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
