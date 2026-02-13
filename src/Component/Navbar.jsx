import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

import { FaShoppingCart } from "react-icons/fa";

export function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("logindata");
    return data ? JSON.parse(data) : null;
  });

  // Auto update navbar
  useEffect(() => {
    const checkUser = () => {
      const data = localStorage.getItem("logindata");
      setUser(data ? JSON.parse(data) : null);
    };

    window.addEventListener("storage", checkUser);
    checkUser();

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("logindata");
    setUser(null);
    navigate("/login-page");
  };

  return (
    <nav className="nav">
     <div className="logo-text">
  Handmade Heritage
</div>

      <ul className="menu">
        <li>
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/Shop" className="nav-link">
            Products
          </NavLink>
        </li>

        <li>
          <NavLink to="/About" className="nav-link">
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/Contact" className="nav-link">
            Contact
          </NavLink>
        </li>

        <li>
          <NavLink to="/Cart" className="nav-link">
            <FaShoppingCart /> Cart
          </NavLink>
        </li>

        {user ? (
          <>
            <li>
              <span
                onClick={handleLogout}
                style={{ cursor: "pointer", color: "red" }}
              >
                Logout
              </span>
            </li>

            <li>
              <span style={{ color: "green", fontWeight: "bold" }}>
                Hello, {user.name}
              </span>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login-page" className="nav-link">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
