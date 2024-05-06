import React, { useState, useEffect } from "react";
import menProducts from "../data/men.json";
import { Square } from "./Square";
import { Box } from "./Box";
//! ESTO NO ME CONVENCE, REVISAR MAS TARDE --->
import img from "../img/1.png";

import "../styles/products.css";

const Products = () => {
  return (
    <div className="products">
      {menProducts.map((word) => (
        <Box
          index={word.id}
          key={word.id}
          routeImg={img}
          name={word.name}
          description={word.description}
          price={word.price + "€"}
        />
      ))}
    </div>
  );
};

export default Products;
