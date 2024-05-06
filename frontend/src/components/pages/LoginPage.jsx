import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, TextField, Container } from "@mui/material";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
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
          <Button type="submit" variant="contained" color="primary">
            Iniciar Sesión
          </Button>
        </form>
        <Typography variant="body1" className="register-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default LoginPage;
