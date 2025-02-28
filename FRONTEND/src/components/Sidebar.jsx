import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "250px", background: "#2c3e50", height: "100vh", padding: "20px", color: "#fff" }}>
      <h2>Sidebar</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <NavLink to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" style={{ color: "#fff", textDecoration: "none" }}>Perfil</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/settings" style={{ color: "#fff", textDecoration: "none" }}>Configurações</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;