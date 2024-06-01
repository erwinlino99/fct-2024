import React, { useState, useEffect } from "react";
import img from "../img/2.jpg";
import { Button, Typography } from "@mui/material";
import "../styles/products.css";
import HeartIcon from "@mui/icons-material/FavoriteOutlined";
import { useParams, useNavigate } from "react-router-dom";
import imagesPath from "../img/images.js"; // Importa el archivo path.js


const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.log("Error fetching products:", e);
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

        // Check if the product is already in the wishlist
        const isProductInWishlist = wish.some((item) => item.id === prod.id);
        if (!isProductInWishlist) {
          wish.push(prod);
          try {
            await fetch(`http://127.0.0.1:5000/wishlist/${userId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(wish),
            });
          } catch (e) {
            console.log(e);
          }
        } else {
          alert("Producto ya está en la lista de deseos");
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
    if (userId) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/cart/${userId}`);
        const cart = await response.json();

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(
          (item) => item.id === prod.id
        );

        if (existingProductIndex !== -1) {
          // Si el producto ya está en el carrito, incrementa times
          cart[existingProductIndex].times += 1;
        } else {
          // Si el producto no está en el carrito, agrégalo con times igual a 1
          prod.times = 1;
          cart.push(prod);
        }

        // Actualizar el carrito en el servidor
        try {
          await fetch(`http://127.0.0.1:5000/cart/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cart),
          });
        } catch (e) {
          console.log(e);
        }
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    } else {
      console.log("No hay nadie logeado");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = () => {
    if (!category) return products;
    return products.filter(
      (prod) =>
        prod.category && prod.category.toLowerCase() === category.toLowerCase()
    );
  };

  useEffect(() => {
    if (products.length > 0) {
      // console.log("Estos son los productos filtrados---->", filterProducts());
    }
  }, [category, products]);

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
          <img src={imagesPath[prod.id]} alt={prod.name} className="product-image" />
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
