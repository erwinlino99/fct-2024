import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imagesPath from "../img/images.jsx"; // Importa el archivo path.js
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
const DetailsProducts = () => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
        if (!response.ok) {
          throw new Error("Error al cargar los detalles del producto.");
        }
        const data = await response.json();
        setProduct(data[0]);
        console.log("PRODUCTO QUE QUIER VER---->", data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  const addCart = async (prod) => {
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

  return (
    <div
      style={{
        backgroundColor: "#ebebeb",
        marginLeft: "15rem",
        marginRight: "15rem",
        display: "flex",
      }}
    >
      <img src={imagesPath[product.id]} style={{ height: "75rem" }} />
      <div
        style={{
          border: "solid",
          width: "100%",
          textAlign: "left",
          padding: 30,
        }}
      >
        <Typography> {product.name}</Typography>
        <Typography>{product.price}€</Typography>
        <Typography>{product.description}</Typography>{" "}
        <FormControl>
          <FormLabel>Tallas</FormLabel>
          <RadioGroup defaultValue="M">
            <FormControlLabel value="XS" control={<Radio />} label="XS" />
            <FormControlLabel value="S" control={<Radio />} label="S" />
            <FormControlLabel value="M" control={<Radio />} label="M" />
            <FormControlLabel value="L" control={<Radio />} label="L" />
            <FormControlLabel value="XL" control={<Radio />} label="XL" />
          </RadioGroup>
          <Button variant="contained" color="success" onClick={()=>{
            addCart(product)
          }}>Comprar</Button>

        </FormControl>


      </div>

    </div>
  );
};

export default DetailsProducts;
