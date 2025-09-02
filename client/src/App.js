import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddSchool from "./pages/AddSchool";
import ShowSchools from "./pages/ShowSchools";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/add-school" />} />
        <Route path="/add-school" element={<AddSchool />} />
        <Route path="/show-schools" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
}

export default App;
