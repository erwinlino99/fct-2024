import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const userJSON = localStorage.getItem("userJSON");

  useEffect(() => {
    if (userJSON) {
      const currentUser = JSON.parse(userJSON);
      setUser(currentUser);
      console.log(currentUser);
      setEditedUser(currentUser);
    }
  }, [userJSON]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/users/${editedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );
    } catch (e) {}
    setUser(editedUser);
    setEditMode(false);
    localStorage.setItem("userJSON", JSON.stringify(editedUser));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        border: "solid",
        textAlign: "center",
        width: "30rem",
        marginTop:'2rem'
      }}
    >
      {user && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    Perfil del Usuario
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">
                    Nombre de usuario:
                  </Typography>
                </TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      name="username"
                      value={editedUser.username}
                      onChange={handleChange}
                    />
                  ) : (
                    user.username
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">
                    Correo Electrónico:
                  </Typography>
                </TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Teléfono:</Typography>
                </TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    user.phone
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Dirección:</Typography>
                </TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      name="domicile"
                      value={editedUser.domicile}
                      onChange={handleChange}
                    />
                  ) : (
                    user.domicile
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Nacimiento:</Typography>
                </TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      name="bornDate"
                      value={editedUser.bornDate}
                      onChange={handleChange}
                    />
                  ) : (
                    user.bornDate
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Contraseña:</Typography>
                </TableCell>
                <TableCell>
                  {editMode ? (
                    <TextField
                      name="password_hash"
                      value={editedUser.password_hash}
                      onChange={handleChange}
                    />
                  ) : (
                    "******"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            {editMode ? (
              <Button variant="contained" color="success" onClick={handleSave}>
                Guardar
              </Button>
            ) : (
              <Button variant="contained" color="warning" onClick={handleEdit}>
                Editar
              </Button>
            )}
          </div>
        </TableContainer>
      )}
    </div>
  );
};

export default MyProfile;
