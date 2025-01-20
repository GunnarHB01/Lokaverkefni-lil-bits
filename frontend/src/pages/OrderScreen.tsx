import React, { useState, useEffect } from "react";
import "../styles/OrderScreen.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const OrderScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const tempOrder = location.state?.tempOrder;
  const navigate = useNavigate();

  useEffect(() => {
    if (!tempOrder) {
      console.error("Temp order not found! Redirecting to the home page.");
      navigate("/");
      return;
    }

    console.log("Temp order received:", tempOrder);

    const foodPrice =
      tempOrder.food?.reduce((acc: number, item: any) => acc + (item.price || 0), 0) || 0;

    const drinksPrice =
      tempOrder.drinks?.reduce(
        (acc: number, item: any) => acc + (item.price || 0) * (item.quantity || 1),
        0
      ) || 0;

    setTotalPrice(((foodPrice + drinksPrice) * peopleCount) / 100);
  }, [tempOrder, peopleCount, navigate]);

  const handleFinalizeOrder = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format. Please enter a valid email.");
      return;
    }

    if (!date || !time) {
      alert("Please select a valid date and time.");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDate = new Date();
    const selectedHour = selectedDateTime.getHours();

    if (selectedDateTime < currentDate) {
      alert("The selected date and time must be today or in the future.");
      return;
    }

    if (selectedHour < 16 || selectedHour >= 23) {
      alert("Please select a time between 16:00 (4 PM) and 23:00 (11 PM).");
      return;
    }

    const finalizedOrder = {
      ...tempOrder,
      email,
      count: peopleCount,
      date: `${date} ${time}`,
      totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/finalize-order",
        finalizedOrder
      );
      navigate("/receipt-screen", { state: { finalizedOrder: response.data.order } });
    } catch (error) {
      console.error("Error finalizing order:", error);
      alert("Failed to finalize the order. Please try again.");
    }
  };

  return (
    <div className="order-screen-container">
      <Navbar />
      <h1 className="header">Order Screen</h1>
      <div className="order-screen-content">
        <div className="people-count-section">
          <h2>How many people?</h2>
          <div className="people-buttons">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i + 1}
                className={`people-button ${peopleCount === i + 1 ? "selected" : ""}`}
                onClick={() => setPeopleCount(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="email-section">
          <h2>Email Address</h2>
          <input
            type="email"
            className="email-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="date-time-section">
          <h2>Date and Time of Pick-up</h2>
          <input
            type="date"
            className="date-input"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            className="time-input"
            value={time}
            min="16:00"
            max="23:00"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="total-price">
          <h2>Total Price: ${(totalPrice).toFixed(2)}</h2>
        </div>

        <button
          className="confirm-button"
          onClick={handleFinalizeOrder}
          disabled={!email || !date || !time}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default OrderScreen;