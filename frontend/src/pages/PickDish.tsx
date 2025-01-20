import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/PickDish.css";
import Navbar from "../components/Navbar";
import pizzaImage from "../assets/images/pizza.png";
import steakImage from "../assets/images/steak.png";
import shrimpImage from "../assets/images/shrimp.png";

const topPicks = [
  {
    name: "Classic Pizza",
    description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce.",
    image: pizzaImage,
    price: 1200,
  },
  {
    name: "Grilled Steak",
    description: "Juicy grilled steak with garlic butter and a side of veggies.",
    image: steakImage,
    price: 2000,
  },
  {
    name: "Garlic Shrimp",
    description: "Sautéed shrimp in garlic butter served with rice and greens.",
    image: shrimpImage,
    price: 1800,
  },
];

const PickDish: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [generatedDish, setGeneratedDish] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const prefilledOrder = location.state?.tempOrder || null;

  useEffect(() => {
    if (prefilledOrder?.food && prefilledOrder.food.length > 0) {
      const previousDish = prefilledOrder.food[0];
      const matchingTopPick = topPicks.find((dish) => dish.name === previousDish.name);

      if (matchingTopPick) {
        setSelectedDish(matchingTopPick);
      } else {
        setGeneratedDish(previousDish);
      }
    }
  }, [prefilledOrder]);

  const handleGenerateDish = async () => {
    try {
      const response = await axios.get("https://themealdb.com/api/json/v1/1/random.php");
      const generated = response.data.meals[0];
      const formattedDish = {
        name: generated.strMeal,
        description: generated.strInstructions,
        image: generated.strMealThumb,
        price: Math.floor(Math.random() * 1000) + 500,
      };
      setGeneratedDish(formattedDish);
      setSelectedDish(null);
    } catch (error) {
      console.error("Error generating random dish:", error);
      alert("Failed to generate a random dish. Please try again.");
    }
  };

  const saveTempOrder = async (dish: any) => {
    const tempOrder = {
      email,
      food: [{ ...dish, name: dish.name || "Unnamed Food" }],
    };

    try {
      const response = await axios.post("http://localhost:3001/api/temp-order", tempOrder);
      navigate("/select-drink", { state: { tempOrder: response.data.order } });
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to save the dish. Please try again.");
    }
  };

  const handleConfirmTopPick = async () => {
    if (!selectedDish) {
      alert("Please select a dish.");
      return;
    }
    saveTempOrder(selectedDish);
  };

  const handleConfirmGeneratedDish = async () => {
    if (generatedDish) {
      saveTempOrder(generatedDish);
    } else {
      alert("Please generate a random dish before confirming.");
    }
  };

  return (
    <div className="pick-dish-container">
      <Navbar />
      <h2 className="header">Pick Dish</h2>
      <div className="pick-dish-content">
        <div className="top-picks">
          <h2>Top Picks!</h2>
          {topPicks.map((dish, index) => (
            <div
              key={index}
              className={`pick-item ${selectedDish === dish ? "selected" : ""}`}
              onClick={() => {
                setSelectedDish(dish);
                setGeneratedDish(null);
              }}
            >
              <div className="food-image">
                <img src={dish.image} alt={dish.name} />
              </div>
              <div className="food-details">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <p>Price: ${(dish.price / 100).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <button
            className="confirm-button"
            onClick={handleConfirmTopPick}
            style={{ backgroundColor: "#C16757" }}
          >
            Confirm
          </button>
        </div>
        <div className="random-generator">
          <h2>Want to Generate a Random Order?</h2>
          <button className="generate-button" onClick={handleGenerateDish}>
            Generate Here!
          </button>
          {generatedDish && (
            <div className="dish-preview">
              <div className="food-image-preview">
                <img src={generatedDish.image} alt={generatedDish.description} />
              </div>
              <div className="food-description">
                <h3>{generatedDish.name}</h3>
                <p>{generatedDish.description}</p>
                <p>Price: ${(generatedDish.price / 100).toFixed(2)}</p>
              </div>
              <button
                className="confirm-button"
                onClick={handleConfirmGeneratedDish}
                style={{ backgroundColor: "#C16757" }}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickDish;