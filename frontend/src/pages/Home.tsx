import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import CustomCarousel from "../components/CustomCarousel";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFindOrder = async () => {
    setErrorMessage("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/orders?email=${email}`);
      if (response.data) {
        const order = response.data;

        if (order.food && order.drinks) {
          navigate("/pick-dish", { state: { tempOrder: order } });
        } else {
          setErrorMessage("No finalized orders found for this email.");
        }
      } else {
        setErrorMessage("No orders found for the provided email address.");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      setErrorMessage("Failed to retrieve order. Please try again.");
    }
  };

  const handleStartOrder = () => {
    navigate("/pick-dish", { state: { email } });
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="carousel-section">
        <CustomCarousel />
      </div>
      <div className="content-section">
        <div className="find-order">
          <h2>Returning Customer</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="find-button" onClick={handleFindOrder}>
            Find Order
          </button>
          {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
        <div className="start-order">
          <button className="order-button" onClick={handleStartOrder}>
            Start Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;