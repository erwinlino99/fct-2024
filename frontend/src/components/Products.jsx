import React, { useState, useEffect } from "react";
import allProducts from "../data/men.json";
//! ESTO ESTA MAL, REVISAR MAS TARDE --->
import img from "../img/1.png";
import { Button, Typography } from "@mui/material";
import "../styles/products.css";
import HeartIcon from "@mui/icons-material/FavoriteOutlined";

const response = await fetch("http://127.0.0.1:5000/products");
const data = await response.json();

const addFavorites = (prod) => {
  console.log(prod);
  //const response=await fetch('http://127.0.0.1:5000/products');
};

const Products = () => {
  //(allProducts);
  return (
    <div className="products">
      {data.map((prod) => (
        <div className="product" key={prod.id}>
          <HeartIcon />
          <img src={img} alt={prod.name} className="product-image" />
          <Typography className="product-name">{prod.name}</Typography>
          <Typography className="product-description">
            {prod.description}
          </Typography>
          <Typography className="product-price">{prod.price}€</Typography>
          <Button variant="contained">Agregar al carrito</Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log(JSON.stringify(prod));
            }}
          >
            Añadir a favoritos
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Products;
