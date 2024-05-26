import React, { useState } from "react";
import { Typography, Button, TextField, Container } from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/users");
      const data = await response.json();
      const userExists = data.some((user) => user[1] === username && user[2] === password);
      if (userExists) {
        console.log("Inicio de sesión exitoso");
        // Redireccionar al usuario a la página de inicio de sesión exitosa
      } else {
        console.log("Nombre de usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al obtener los datos de la API", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ border: "solid" }}>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
