import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/header.css";
import "../../styles/square.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { information: "Inicio", location: "/" },
    { information: "Hombre", location: "/hombre" },
    { information: "Mujer", location: "/mujer" },
    { information: "Niñas", location: "/girls" },
    { information: "Niños", location: "/boys" },
    // { information: "Ofertas", location: "/ofertas" },
    { information: "Accesorios", location: "/accesorios" },
  ];
  // <header className="customHeader">

  console.log("Estoy en--->",location.pathname)
  return (
    // etiqueta html
    <header > 
      {pages.map((page, index) => (
        <Button
          key={index}
          variant="contained"
          color={location.pathname === page.location ? "success" : "primary"}
          onClick={() => navigate(page.location)}
          sty
        >
          <Typography>{page.information}</Typography>
        </Button>
      ))}
    </header>
  );
};

export default Header;
