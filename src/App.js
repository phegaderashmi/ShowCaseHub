import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddShowcase from "./components/AddShowCase";
import ShowcaseList from "./components/ShowcaseList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddShowcase />} />
        <Route path="/list" element={<ShowcaseList />} />
      </Routes>
    </Router>
  );
}

export default App;
