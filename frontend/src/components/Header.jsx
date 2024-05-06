import React, { useState, useEffect } from "react";
import "../styles/header.css";
import "../styles/square.css";
import menProducts from "../data/men.json";
import { Square } from "./Square";

const information = {
  men: "Hombre",
  women: "Mujer",
  girls: "Niñas",
  boys: "Niños",
  offers: "Ofertas",
  equipment: "Equipamiento",
  brands: "Marcas",
};

function Header() {
  //* HOOKS -->
  const [selectedSquare, setSelectedSquare] = useState(null);

  //*-----------------
  const bringProducts = () => {
    return new Promise((resolve, reject) => {
      resolve(menProducts);
    });
  };

  const handleClick = (index, info) => {
    setSelectedSquare(index);
    console.log(`Informacion de : ${info}`);
  };

  return (
    <header className="customHeader">
      {Object.keys(information).map((key, index) => (
        <Square
          key={index}
          customStyle={selectedSquare === index ? "titleSelected" : "title"}
          upgradeEvent={() => handleClick(index, information[key])}
          info={information[key]}
        />
      ))}
    </header>
  );
}

export default Header;
