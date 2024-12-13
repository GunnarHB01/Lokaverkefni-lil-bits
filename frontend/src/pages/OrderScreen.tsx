import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, dish, drinks } = location.state || {};

  const handleConfirm = () => {
    navigate("/receipt-screen", {
      state: { name, dish, drinks },
    });
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Name: {name}</p>
      <p>Dish: {dish}</p>
      <p>Drinks: {drinks?.join(", ")}</p>
      <button onClick={() => navigate("/select-drink")}>Back</button>
      <button onClick={handleConfirm}>Confirm Order</button>
    </div>
  );
};

export default OrderScreen;
