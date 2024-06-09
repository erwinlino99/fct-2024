import React, { useState } from "react";
import { Typography, Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [userId, serUserId] = useState("");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/users");
      const data = await response.json();
      console.log(data);
  
      const user = data.find((user) => {
        return user.username === username && user.password_hash === password;
      });
  
      if (user) {
        const formattedBornDate = new Date(user.bornDate).toISOString().split('T')[0];
        user.bornDate = formattedBornDate;
        localStorage.setItem('userJSON',JSON.stringify(user))
        console.log('el usuario es : -------->>',user)
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        window.location.href = "/";

      } else {
        alert("Nombre de usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al obtener los datos de la API", error);
    }
  };
  

  const goRegister = () => {
    navigate("/register");
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        backgroundColor: "#D7DED8",
        height: "22rem",
        marginTop: "10rem",
      }}
    >
      <div>
        <Typography variant="h3" component="h1" gutterBottom>
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
          <Button type="submit" variant="contained" color="success">
            Iniciar Sesión
          </Button>
        </form>
        <Divider style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
        <Button
          type="submit"
          variant="contained"
          color="warning"
          onClick={goRegister}
        >
          ¿No tienes cuenta? Registrate Ahora
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
