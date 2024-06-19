import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import HeartIcon from "@mui/icons-material/FavoriteOutlined";
import { useParams, useNavigate } from "react-router-dom";
import imagesPath from "../img/images.jsx"; // Importa el archivo path.js

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
  //EXPLICAR --->
  const addFavorites = async (e, prod) => {
    e.stopPropagation();
    if (userId) {
      try {
        // Recupero la lista de deseados
        const response = await fetch(
          `http://127.0.0.1:5000/wishlist/${userId}`
        );
        const wish = await response.json();

        //Veo si el producto ya existe
        const isProductInWishlist = wish.some((item) => item.id === prod.id);
        if (!isProductInWishlist) {
          // Si NO exite lo insertamos en la lista,lo agregamos y actualizamos en la BBD
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
        //vamos a recuperar el carrito del usuario almacenado
        const response = await fetch(`http://127.0.0.1:5000/cart/${userId}`);
        const cart = await response.json();
        //Vemos si el producto existe ya en el carrito
        const existingProductIndex = cart.findIndex(
          (item) => item.id === prod.id
        );
        if (existingProductIndex !== -1) {
          //si ya existe le agregamos la propiedad 'times', que será la cantidad de veces que almacenará
          //de este producto
          cart[existingProductIndex].times += 1;
        } else {
          //caso contrario solo le agregamos la propiedad con 1 como valor inicial
          // y lo agregamos al carrito recuperado
          prod.times = 1;
          cart.push(prod);
        }
        // Ahora con el carrito actualizado vamos a meterlo dentro del endopint correspodiente
        // para que actulice el campo del usuario
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
    <div
      style={{
        marginTop: "2rem",
        width: "auto",
        height: "auto",
        display: "flex",
        gridTemplateColumns: "repeat(4, 23%)",
      }}
    >
      {filterProducts().map((prod) => (
        <div
          className="product"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "solid",
            height: "100%",
            maxWidth: "40rem",
            fontSize: "1rem",
            margin: "1rem",
            display: "grid",
            textAlign: "center",
          }}
          key={prod.id}
          onClick={() => {
            navigate(`/products/${prod.id}`);
          }}
        >
          <img
            src={imagesPath[prod.id]}
            alt={"NOT FOUND"}
            style={{ height: "35rem", width: "100%" }}
          />
          <div
            style={{
              width: "2.5rem",
              position: "relative",
              bottom: "35rem",
              left: "20rem",
              cursor: "pointer",
            }}
            onClick={(e) => {
              addFavorites(e, prod);
            }}
          >
           {/* <HeartIcon sx={{ fontSize: "2.5rem", color: clicked === true ? 'red' : '' }} /> */}
           <HeartIcon sx={{ fontSize: "2.5rem" }} />

          </div>

          <Typography className="product-name">{prod.name}</Typography>

          <Typography className="product-price">{prod.price}€</Typography>

          <Button
            variant="contained"
            onClick={(e) => {
              addCart(e, prod);
            }}
          >
            Agregar al carrito
          </Button>
          {/* <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              addFavorites(e, prod);
            }}
          >
            Añadir a favoritos
          </Button> */}
        </div>
      ))}
    </div>
  );
};

export default Products;
