import React from "react";
import "../styles/ReceiptScreen.css";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const ReceiptScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const finalizedOrder = location.state?.finalizedOrder;

  if (!finalizedOrder) {
    return <h2>No order found. Please go back to the home screen and start again.</h2>;
  }

  const { food, drinks, count, date, email } = finalizedOrder;

  console.log("Finalized Order:", finalizedOrder);

  const foodPrice = food?.reduce((acc: number, item: any) => acc + (item.price || 0), 0) || 0;
  const drinksPrice = drinks?.reduce((acc: number, item: any) => acc + (item.price || 0) * (item.quantity || 1), 0) || 0;

  const totalPrice = ((foodPrice + drinksPrice) * count) / 100;

  return (
    <div className="receipt-container">
      <Navbar />
      <h1 className="receipt-header">Receipt</h1>
      <div className="receipt-content">
        <div className="info-section">
          <div>Number of people: {count}</div>
          <div>Date: {new Date(date).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })}</div>
          <div>Email: {email}</div>
        </div>
        <div className="order-details">
          <h2>Your Order:</h2>
          {food?.map((item: any, index: number) => (
            <div className="order-item" key={index}>
              <span>{item.name || "Unnamed Food"}</span>
              <span>${((item.price * count) / 100).toFixed(2)}</span>
            </div>
          ))}
          {drinks?.map((drink: any, index: number) => (
            <div className="order-item" key={food.length + index}>
              <span>{drink.name}</span>
              <span>${((drink.price * (drink.quantity || 1) * count) / 100).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="total-price-section">
          Total Price: ${totalPrice.toFixed(2)}
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate("/")}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptScreen;
