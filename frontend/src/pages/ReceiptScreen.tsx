import React from "react";
import { useLocation } from "react-router-dom";

const ReceiptScreen: React.FC = () => {
  const location = useLocation();
  const { name, dish, drinks } = location.state || {};

  return (
    <div>
      <h1>Receipt</h1>
      <p>Thank you, {name}, for your order!</p>
      <p>Dish: {dish}</p>
      <p>Drinks: {drinks?.join(", ")}</p>
    </div>
  );
};

export default ReceiptScreen;
