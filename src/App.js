import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Home Page */}
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
