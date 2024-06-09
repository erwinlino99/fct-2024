import EmptyPage from "../../pages/EmptyPage";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import SummaryCart from "./SummaryCart";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [buy, setBuy] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/cart/${userId}`);
      const data = await response.json();
      setBuy(data);
    } catch (e) {
      console.log(e);
    }
  };

  const removeFromCart = async (item) => {
    console.log(item);
    console.log("------->", buy);
    const productIndexToRemove = buy.findIndex(
      (product) => product.id === item.id
    );

    if (productIndexToRemove !== -1) {
      const updatedCart = [...buy];
      updatedCart.splice(productIndexToRemove, 1);
      setBuy(updatedCart);
      try {
        const response = await fetch(`http://127.0.0.1:5000/cart/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCart),
        });
        if (response.ok) {
          console.log("Carrito actualizado con éxito:", response);
        } else {
          console.log("Error al actualizar el carrito:", response);
        }
      } catch (error) {
        console.log("Error al actualizar el carrito:", error);
      }
    }
  };

  const changeTimes = async (item, times) => {
    const updatedCart = [...buy];
    const itemIndex = updatedCart.findIndex(
      (product) => product.id === item.id
    );

    if (itemIndex !== -1) {
      updatedCart[itemIndex].times = times;
      setBuy(updatedCart);

      try {
        const response = await fetch(`http://127.0.0.1:5000/cart/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCart),
        });
        if (response.ok) {
          console.log("Carrito actualizado con éxito:", response);
        } else {
          console.log("Error al actualizar el carrito:", response);
        }
      } catch (error) {
        console.log("Error al actualizar el carrito:", error);
      }
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div>
      {buy.length === 0 ? (
        <EmptyPage
          title={
            "No tienes ningún artículo en tu carrito"
          }
        />
      ) : (
        <div
          style={{
            margin: "auto",
            padding: "20px",
          }}
        >
          <div
            style={{
              margin: "auto",
              padding: "20px",
              borderRadius: "10px",
              border: "solid 1px",
              textAlign: "center",
              width: "20rem",
            }}
          >
            <SummaryCart items={buy} pdf={false} />
          </div>
          <div
            style={{
              border: "solid 1px",
              display: "flex",
              padding: "2rem",
              marginTop: 20,
              borderRadius: "10px",
            }}
          >
            {buy.map((item) => (
              <Box
                key={item.id}
                sx={{
                  backgroundColor: "#d4d2cf",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: 2,
                  width: "15rem",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">{item.description}</Typography>
                <Typography variant="body1">{item.category}</Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  {item.price}€
                </Typography>
                <FormControl
                  variant="outlined"
                  sx={{ width: "100%", background: "white" }}
                >
                  <InputLabel>Cantidad</InputLabel>
                  <Select
                    defaultValue={item.times}
                    onChange={(e) => changeTimes(item, e.target.value)}
                    label="Cantidad"
                  >
                    {[...Array(10).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeFromCart(item)}
                  sx={{ marginTop: "10px" }}
                >
                  Eliminar
                </Button>
              </Box>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
