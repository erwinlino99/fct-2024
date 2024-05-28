import React, { useState } from "react";
import { Typography, Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Divider} from "@mui/material";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Nuevo estado para el correo electrónico
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password_hash: password,
          email: email,
        }),
      });

      if (response.ok) {
        console.log("Usuario registrado exitosamente:", username, email);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error al registrar al usuario:", errorData.message);
      }
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        backgroundColor: "#D7DED8",
        height: "25rem",
        marginTop: "10rem",
      }}
    >
      <div className="register-container">
        <Typography variant="h4" component="h1" gutterBottom>
          Registro de Usuario
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
            style={{ backgroundColor: "white" }}
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
            style={{ backgroundColor: "white" }}
          />
          <TextField
            id="email"
            label="Correo electrónico"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: "white" }}
          />
          <Button type="submit" variant="contained" color="success">
            Registrarse
          </Button>
        </form>

        <Divider style={{marginTop:'0.5rem',marginBottom:'0.5rem'}}/>
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate("/login")}
          style={{marginTop:'0.5rem'}}
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Button>
      </div>
    </Container>
  );
};

export default RegisterPage;
