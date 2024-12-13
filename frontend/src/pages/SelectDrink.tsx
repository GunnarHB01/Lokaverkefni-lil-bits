import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const drinks = ["Water", "Soda", "Juice", "Tea"];

const SelectDrink: React.FC = () => {
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { name, dish } = location.state || {};

  const toggleDrink = (drink: string) => {
    setSelectedDrinks((prev) =>
      prev.includes(drink) ? prev.filter((d) => d !== drink) : [...prev, drink]
    );
  };

  const handleNext = () => {
    if (selectedDrinks.length === 0) {
      alert("Please select at least one drink!");
    } else {
      navigate("/order-screen", {
        state: { name, dish, drinks: selectedDrinks },
      });
    }
  };

  return (
    <div>
      <h1>Select Drinks</h1>
      <ul>
        {drinks.map((drink) => (
          <li key={drink}>
            <button
              onClick={() => toggleDrink(drink)}
              style={{
                backgroundColor: selectedDrinks.includes(drink)
                  ? "lightblue"
                  : "",
              }}
            >
              {drink}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/select-dish")}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SelectDrink;
