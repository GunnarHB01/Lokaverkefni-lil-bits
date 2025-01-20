import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Lil Bits Logo" />
      </div>
      <ul>
        <li className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
        </li>
        <li
          className={location.pathname === "/pick-dish" ? "nav-link active" : "nav-link"}
        >
          Pick Dish
        </li>
        <li
          className={location.pathname === "/select-drink" ? "nav-link active" : "nav-link"}
        >
          Select Drink
        </li>
        <li
          className={location.pathname === "/order-screen" ? "nav-link active" : "nav-link"}
        >
          Order Screen
        </li>
        <li
          className={
            location.pathname === "/receipt-screen" ? "nav-link active" : "nav-link"
          }
        >
          Receipt Screen
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
