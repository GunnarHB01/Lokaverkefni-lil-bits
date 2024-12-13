import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const dishes = ["Pizza", "Burger", "Salad", "Pasta"];

const SelectDish: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || {};

  const handleNext = () => {
    if (!selectedDish) {
      alert("Please select a dish!");
    } else {
      navigate("/select-drink", { state: { name, dish: selectedDish } });
    }
  };

  return (
    <div>
      <h1>Select a Dish</h1>
      <ul>
        {dishes.map((dish) => (
          <li key={dish}>
            <button
              onClick={() => setSelectedDish(dish)}
              style={{
                backgroundColor: selectedDish === dish ? "lightgreen" : "",
              }}
            >
              {dish}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SelectDish;
