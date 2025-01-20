import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PickDish from "./pages/PickDish";
import SelectDrink from "./pages/SelectDrink";
import OrderScreen from "./pages/OrderScreen";
import ReceiptScreen from "./pages/ReceiptScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pick-dish" element={<PickDish />} />
        <Route path="/select-drink" element={<SelectDrink />} />
        <Route path="/order-screen" element={<OrderScreen />} />
        <Route path="/receipt-screen" element={<ReceiptScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
