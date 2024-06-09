import React, { useEffect, useState } from "react";
import EmptyPage from "../../pages/EmptyPage";
import { Button, Typography } from "@mui/material";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
const Favourite = () => {
  const userId = localStorage.getItem("userId");
  const [products, setProducts] = useState([]);
  const [remove, setRemove] = useState(null);
  const [update, setUpdate] = useState([]);

  // Función asincrónica para traer toda la 'wishlist ' del usuario
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/wishlist/${userId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener la lista de favoritos:", error);
    }
  };

  // Función para manejar la eliminación del producto de la lista
  const removeFromWishlist = async (productId) => {
    console.log(productId);
    const productIndexToRemove = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndexToRemove !== -1) {
      // Crear una copia de la lista de productos
      const updatedProducts = [...products];
      // Eliminar el producto de la lista
      updatedProducts.splice(productIndexToRemove, 1);
      // Actualizar el estado de 'products' con la lista actualizada
      setProducts(updatedProducts);

      console.log(JSON.stringify(updatedProducts));
      console.log(typeof JSON.stringify(updatedProducts));

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/wishlist/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProducts),
          }
        );
        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (remove) {
      console.log("LISTA ACTUALIZADA --->", products);
    }
  }, [remove, products]);

  return (
    <>
      {products.length === 0 ? (
        <EmptyPage
          title={"No tienes ningún artículo en tu lista de Favoritos"}
        />
      ) : (
        <div
          style={{
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            border: "solid 1px",
            width: "30rem",
            marginTop: "2rem",
          }}
        >
          <Typography variant="h4">Mi lista de favoritos</Typography>
          {products.map((item) => (
            <div
              style={{
                backgroundColor: "#d4d2cf",
                margin: "2rem",
                textAlign: "center",
                borderRadius: "10px",
                alignItems: "center",
              }}
              key={item.id}
            >
              <Typography variant="h5">{item.name}</Typography>
              <Typography variant="body1">{item.description}</Typography>
              <Typography variant="body1">{item.category}</Typography>
              <Typography variant="body1">{item.price}€</Typography>
              <div
                style={{
                  height: "auto",
                  width: "auto",
                  backgroundColor: "white",
                }}
              >
                <HeartBrokenIcon
                  onClick={() => removeFromWishlist(item.id)}
                  sx={{ color: "#ab1111", cursor: "pointer", }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourite;
