import  { useState, useEffect } from "react";
import React from "react";
import { Typography, Button } from "@mui/material";

export const Box = ({ routeImg, name, description, price }) => {

  useEffect(()=>{
    console.log('Producto agregado a favoritos');
  } )


  return (
    <div>
      <img src={routeImg} alt="Not found" />
      <Typography>{name} </Typography>
      <Typography>{description}</Typography>
      <Typography>{price}</Typography>
      <Button> Agregar al carrito</Button>
    </div>
  );
};

export default Box;
