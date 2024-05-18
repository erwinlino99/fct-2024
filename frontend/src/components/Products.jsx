import React, { useState, useEffect } from "react";
import allProducts from "../data/men.json";
//! ESTO ESTA MAL, REVISAR MAS TARDE --->
import img from "../img/1.png";
import { Button, Typography } from "@mui/material";
import "../styles/products.css";

const Products = () => {
  console.log(allProducts);
  return (
    <div className="products">
      {allProducts.map((prod) => (
        <div className="product" key={prod.id}>
          <img src={img} alt={prod.name} className="product-image" />
          <Typography className="product-name">{prod.name}</Typography>
          <Typography className="product-description">
            {prod.description}
          </Typography>
          <Typography className="product-price">{prod.price}€</Typography>
          <Button variant="contained">Comprar</Button>
        </div>
      ))}
    </div>
  );
};

export default Products;
