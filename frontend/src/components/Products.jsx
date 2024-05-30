import React, { useState, useEffect } from "react";
import exampleData from "../data/men.json";
//REVISION de imagen individual
import img from "../img/1.png";
import { Button, Typography } from "@mui/material";
import "../styles/products.css";
import HeartIcon from "@mui/icons-material/FavoriteOutlined";
import { useParams } from "react-router-dom";

const Products = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/products");
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addFavorites = async (prod) => {
    console.log("Estoy con, ", userId);

    if (userId) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/wishlist/${userId}`);
        const wish = await response.json();
        console.log("Lista de deseo", wish);
        wish.push(prod);

        try {
          const response = await fetch(`http://127.0.0.1:5000/wishlist/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(wish),
          });
          if (response) {
            console.log(response);
          }
        } catch (e) {
          console.log(e);
        }
      } catch (error) {
        console.error("Error al obtener la lista de favoritos:", error);
      }
    } else {
      console.log("No hay nadie logeado");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = () => {
    if (!type) return products;
    return products.filter(prod => prod.category.toLowerCase() === type.toLowerCase());
  };

  useEffect(() => {
    if (products.length > 0) {
      console.log("Estos son los productos filtrados---->", filterProducts());
    }
  }, [type, products]);

  return (
    <div className="products">
      {filterProducts().map((prod) => (
        <div className="product" key={prod.id}>
          <HeartIcon />
          <img src={img} alt={prod.name} className="product-image" />
          <Typography className="product-name">{prod.name}</Typography>
          <Typography className="product-description">{prod.description}</Typography>
          <Typography className="product-price">{prod.price}€</Typography>
          <Button variant="contained">Agregar al carrito</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => addFavorites(prod)}
          >
            Añadir a favoritos
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Products;
