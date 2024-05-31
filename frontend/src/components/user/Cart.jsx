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
  const [quantities, setQuantities] = useState({});

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/cart/${userId}`);
      const data = await response.json();
      setBuy(data);

      // Initialize quantities for each item
      const initialQuantities = {};
      data.forEach((item) => {
        initialQuantities[item.id] = 1; // default quantity
      });
      setQuantities(initialQuantities);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCart();
    console.log("El carrito------->", buy);
  }, []);

  const handleQuantityChange = (itemId, event) => {
    setQuantities({
      ...quantities,
      [itemId]: event.target.value,
    });
  };

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
                  {item.price}
                </Typography>
                <FormControl variant="outlined" style={{ minWidth: 100 }}>
                  <InputLabel>Cantidad</InputLabel>
                  <Select
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e)}
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
                  >
                    Eliminar
                  </Button>
                </FormControl>
              </div>
            ))}
            <SummaryCart items={buy} />
          </div>
        </div>
      )}
    </>
  );
};
export default Cart;
