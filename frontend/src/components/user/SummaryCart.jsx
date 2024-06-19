import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SummaryCart = ({ items, pdf }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const delivery = 7.99;
  const discountRate = 10;
  const userId = localStorage.getItem("userId");

  const calculatePrice = (items) => {
    let total = 0;
    for (let item of items) {
      total += item.price * item.times;
    }
    setPrice(total);
  };

  const updateDataBase = async (items) => {
    for (const prod of items) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/products/${prod.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(prod),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        } else {
          try {
            const response = await fetch(
              `http://127.0.0.1:5000/cart/${userId}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(prod),
              }
            );

            console.log(response);
          } catch (e) {}
        }
      } catch (e) {}
    }
    alert('Gracias por tu compra');
    navigate('/');
  };

  useEffect(() => {
    calculatePrice(items);
  }, [items]);

  const finalPrice = price >= 25 ? price : price + delivery;
  const discountedPrice = finalPrice - (discountRate / 100) * finalPrice;

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
        Total: {discountedPrice.toFixed(2)}€
      </Typography>

      {pdf === false ? (
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
          onClick={() => updateDataBase(items)}
        >
          Finalizar compra
        </Button>
      )}
    </div>
  );
};

export default SummaryCart;
