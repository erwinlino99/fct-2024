import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Button, TextField, Container } from "@mui/material";
const LoginPage = () => {

  const [user,setUser]=useState(null);
  const [pass,setPass]=useState(null);
  const [good,setGood]=useState("NO HAY CONEXION");


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const checkUser=()=>{

  }

  return (
    <Container maxWidth="sm" style={{border:'solid'}}>
      <div className="login-container">
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" onClick={checkUser}>
            Iniciar Sesión
          </Button>
        </form>
     
      </div>
    </Container>
  );
};

export default LoginPage;
