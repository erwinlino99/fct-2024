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
} from "@mui/material";

const CustomProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJSON = localStorage.getItem("userJSON");
    if (userJSON) {
      const currentUser = JSON.parse(userJSON);
      setUser(currentUser);
      console.log("Usuario actual:", currentUser);
    }
  }, []);

  return (
    <div>
      {user && (
        <TableContainer
          component={Paper}
          sx={{ marginTop: 10, background: "#aba6a6" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              {" "}
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
                <TableCell align="left">{user.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">
                    Correo Electrónico:
                  </Typography>
                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Telefono:</Typography>
                </TableCell>
                <TableCell align="left">{user.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Dirección:</Typography>
                </TableCell>
                <TableCell align="left">{user.domicile}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">Nacimiento:</Typography>
                </TableCell>
                <TableCell align="left">{user.bornDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button variant="contained" color="success" onClick={() => {}}>
            Editar
          </Button>
        </TableContainer>
      )}
    </div>
  );
};

export default CustomProfile;
