import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">SchoolApp</div>
      <div className="nav-links">
        <NavLink to="/add-school" className={({ isActive }) => isActive ? "active" : ""}>
          Add School
        </NavLink>
        <NavLink to="/show-schools" className={({ isActive }) => isActive ? "active" : ""}>
          Show Schools
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
