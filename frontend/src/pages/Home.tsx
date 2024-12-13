import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (name.trim() === "") {
      alert("Please enter your name!");
    } else {
      navigate("/select-dish", { state: { name } });
    }
  };

  return (
    <div>
      <h1>Welcome to Lil' Bits!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Home;
