import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelectDish from "./pages/SelectDish";
import SelectDrink from "./pages/SelectDrink";
import OrderScreen from "./pages/OrderScreen";
import ReceiptScreen from "./pages/ReceiptScreen";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select-dish" element={<SelectDish />} />
      <Route path="/select-drink" element={<SelectDrink />} />
      <Route path="/order-screen" element={<OrderScreen />} />
      <Route path="/receipt-screen" element={<ReceiptScreen />} />
    </Routes>
  );
};

export default App;
