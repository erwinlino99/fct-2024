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
} from "@mui/material";
const DetailsProducts = () => {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

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
          <RadioGroup>
            <FormControlLabel value="XS" control={<Radio />} label="XS" />
            <FormControlLabel value="S" control={<Radio />} label="S" />
            <FormControlLabel value="M" control={<Radio />} label="M" />
            <FormControlLabel value="L" control={<Radio />} label="L" />
            <FormControlLabel value="XL" control={<Radio />} label="XL" />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default DetailsProducts;
