import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SummaryCart = ({ items, pdf }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const delivery = 7.99;
  const discountRate = 10;
  const calculatePrice = (items) => {
    let total = 0;
    for (let item of items) {
      total += item.price * item.times;
    }

    setPrice(total);
  };

  useEffect(() => {
    calculatePrice(items);
    //console.log('dentro del carrito-->',items)
  }, [items]);

  return (
    <div
      style={{ backgroundColor: "white", padding: "16px", borderRadius: "8px" }}
    >
      <Typography variant="h5">Resumen del pedido</Typography>
      <Typography>Valor del pedido: {price.toFixed(2)}€ </Typography>
      <Typography>
        Gastos de entrega: {price >= 25 ? "Gratis" : `€${delivery.toFixed(2)}`}
      </Typography>
      <Typography sx={{ color: "red" }}>Descuento: {discountRate}%</Typography>
      <Divider sx={{ borderColor: "black", margin: "16px 0" }} />
      <Typography variant="h6">
        Total: {(price - 10 * (price / 100)).toFixed(2)}{" "}
      </Typography>

      {pdf == false ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/payment")}
        >
          Comprar
        </Button>
      ) : (
        <Button
        variant="contained"
        color="success"
      >
        Finalizar compra
      </Button>
      )}
    </div>
  );
};
// {`../img/${prod.id}.jpg`}
export default SummaryCart;
