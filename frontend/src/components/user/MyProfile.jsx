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
      console.log(currentUser)
      setEditedUser(currentUser);
    }
  }, [userJSON]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave =async () => {
    try{
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

    }catch(e){

    }
    setUser(editedUser);
    setEditMode(false);
    localStorage.setItem("userJSON", JSON.stringify(editedUser))
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };

  return (
    <div>
      {user && (
        <TableContainer
          component={Paper}
          sx={{ marginTop: 10, background: "#aba6a6" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <Typography
                variant="h4"
                gutterBottom
                style={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Perfil del Usuario
              </Typography>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">
                    Nombre de usuario:
                  </Typography>
                </TableCell>
                <TableCell align="left">
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
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">
                    Correo Electrónico:
                  </Typography>
                </TableCell>
                <TableCell align="left">
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
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Telefono:</Typography>
                </TableCell>
                <TableCell align="left">
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
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Dirección:</Typography>
                </TableCell>
                <TableCell align="left">
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
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Nacimiento:</Typography>
                </TableCell>
                <TableCell align="left">
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
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Contraseña:</Typography>
                </TableCell>
                <TableCell align="left">
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
          {editMode ? (
            <Button variant="contained" color="success" onClick={handleSave}>
              Guardar
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={handleEdit}>
              Editar
            </Button>
          )}
        </TableContainer>
      )}
    </div>
  );
};

export default MyProfile;
