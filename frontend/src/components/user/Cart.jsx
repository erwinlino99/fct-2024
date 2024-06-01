import EmptyPage from "../../pages/EmptyPage";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
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
    const itemIndex = updatedCart.findIndex((product) => product.id === item.id);
  
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
    <>
      {buy.length === 0 ? (
        <div>
          <EmptyPage
            title={
              "No tienes ningun articulo en tu carrito vamos a empezar a comprar"
            }
          />
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: "grey", width: "30rem" }}>
            {buy.map((item) => (
              <div
                style={{
                  backgroundColor: "white",
                  margin: "2rem",
                  padding: "rem",
                  height: "auto",
                  width: "10rem",
                }}
                key={item.id}
              >
                <Typography>{item.name}</Typography>
                <Typography>{item.description}</Typography>
                <Typography>{item.category}</Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {item.price}€
                </Typography>
                <FormControl variant="outlined" style={{ minWidth: 100 }}>
                  <InputLabel>Cantidad</InputLabel>
                  <Select
                    defaultValue={item.times}
                    onChange={(e) => changeTimes(item, e.target.value)}
                    label="Cantidad"
                    sx={{ height: 40, width: "4rem" }}
                  >
                    {[...Array(10).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ fontSize: 12 }}
                    onClick={() => removeFromCart(item)}
                  >
                    Eliminar
                  </Button>
                </FormControl>
              </div>
            ))}
            <SummaryCart items={buy} pdf={false} />
          </div>
        </div>
      )}
    </>
  );
};
export default Cart;
