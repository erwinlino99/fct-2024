import React, { useState, useEffect } from "react";
import "../styles/header.css";
import "../styles/square.css";
import menProducts from "../data/men.json";
import { Button, Typography } from "@mui/material";
import "../styles/header.css";

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
  const [selectedSquare, setSelectedSquare] = useState(null);

  // const bringProducts = () => {
  //   return new Promise((resolve, reject) => {
  //     resolve(menProducts);
  //     console.log(menProducts)
  //   });
  // };

  const handleClick = (index) => {
    setSelectedSquare(index);
  };

  return (
    <header className="customHeader">
      {Object.keys(information).map((key, index) => (
        <Button
          key={index} // Mueve la key aquí
          variant="contained"
          onClick={() => handleClick(index)}
        >
          {/* <div className={selectedSquare === index ? "titleSelected" : "title"}> */}
            <Typography>{information[key]}</Typography>
          {/* </div> */}
        </Button>
      ))}
    </header>
  );
}

export default Header;
