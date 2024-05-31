import React, { useState, useEffect } from "react";
//REVISION de imagen individual
import img from "../img/1.png";
import { Button, Typography } from "@mui/material";
import "../styles/products.css";
import HeartIcon from "@mui/icons-material/FavoriteOutlined";
import { useParams, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
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

  const addFavorites = async (e, prod) => {
    e.stopPropagation();
    if (userId) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/wishlist/${userId}`
        );
        const wish = await response.json();
        wish.push(prod);

        try {
          const response = await fetch(
            `http://127.0.0.1:5000/wishlist/${userId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(wish),
            }
          );
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

  const addCart = async (e, prod) => {
    e.stopPropagation();
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = () => {
    if (!type) return products;
    return products.filter(
      (prod) => prod.category.toLowerCase() === type.toLowerCase()
    );
  };

  useEffect(() => {
    if (products.length > 0) {
      console.log("Estos son los productos filtrados---->", filterProducts());
    }
  }, [type, products]);

  return (
    <div className="products">
      {filterProducts().map((prod) => (
        <div
          className="product"
          key={prod.id}
          onClick={() => {
            navigate(`/products/${prod.id}`);
          }}
        >
          <HeartIcon />
          <img src={img} alt={prod.name} className="product-image" />
          <Typography className="product-name">{prod.name}</Typography>
          <Typography className="product-description">
            {prod.description}
          </Typography>
          <Typography className="product-price">{prod.price}€</Typography>
          <Button
            variant="contained"
            onClick={(e) => {
              addCart(e, prod);
            }}
          >
            Agregar al carrito
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              addFavorites(e, prod);
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
