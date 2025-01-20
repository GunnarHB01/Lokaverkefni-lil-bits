import React, { useState, useEffect } from "react";
import "../styles/SelectDrink.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const SelectDrink: React.FC = () => {
  const [drinks, setDrinks] = useState<any[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<{ [key: string]: number }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const tempOrder = location.state?.tempOrder;

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
        );

        const drinksWithPrices = response.data.drinks.map((drink: any) => ({
          ...drink,
          price: Math.floor(Math.random() * 500) + 200,
        }));

        setDrinks(drinksWithPrices);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchDrinks();
  }, []);

  useEffect(() => {
    const drinksPrice = Object.entries(selectedDrinks).reduce((total, [id, quantity]) => {
      const drink = drinks.find((drink) => drink.idDrink === id);
      if (drink) {
        return total + drink.price * quantity;
      }
      return total;
    }, 0);

    setTotalPrice(drinksPrice);
  }, [selectedDrinks, drinks]);

  const handleIncrement = (id: string) => {
    setSelectedDrinks((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setSelectedDrinks((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  const handleConfirmSelection = async () => {
    if (!tempOrder) {
      alert("No temporary order found. Please start again.");
      return;
    }

    const selected = Object.entries(selectedDrinks)
      .filter(([_, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const drink = drinks.find((drink) => drink.idDrink === id);
        return {
          id: drink.idDrink,
          name: drink.strDrink,
          quantity,
          price: drink.price,
        };
      });

    if (selected.length === 0) {
      alert("Please select at least one drink.");
      return;
    }

    const updatedTempOrder = {
      ...tempOrder,
      drinks: selected,
    };

    try {
      const response = await axios.put("http://localhost:3001/api/temp-order", updatedTempOrder);
      navigate("/order-screen", { state: { tempOrder: response.data.order } });
    } catch (error) {
      console.error("Error updating temporary order:", error);
      alert("Failed to save the selected drinks. Please try again.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(drinks.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const drinksToDisplay = drinks.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="select-drink-container">
      <Navbar />
      <h1 className="header">Select Drink</h1>
      <div className="pagination-controls">
        <button className="arrow-button" onClick={handlePreviousPage} disabled={currentPage === 0}>
          ◀
        </button>
        <div className="drink-cards-container">
          {drinksToDisplay.map((drink) => (
            <div className="drink-card" key={drink.idDrink}>
              <div className="image-section">
                <img src={drink.strDrinkThumb} alt={drink.strDrink} />
              </div>
              <div className="info">
                <h3>{drink.strDrink}</h3>
                <p>Price: ${(drink.price / 100).toFixed(2)}</p>
                <div className="controls">
                  <button onClick={() => handleDecrement(drink.idDrink)}>-</button>
                  <span>{selectedDrinks[drink.idDrink] || 0}</span>
                  <button onClick={() => handleIncrement(drink.idDrink)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="arrow-button"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(drinks.length / itemsPerPage) - 1}
        >
          ▶
        </button>
      </div>

      <div className="total-price">
        <h3>Total Drink Price: ${(totalPrice / 100).toFixed(2)}</h3>
      </div>

      <button className="confirm-all-button" onClick={handleConfirmSelection}>
        Confirm All
      </button>
    </div>
  );
};

export default SelectDrink;
