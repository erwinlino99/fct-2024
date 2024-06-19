import { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import SummaryCart from "../user/SummaryCart";
import { useNavigate } from "react-router-dom";

const CheckPayment = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [buy, setBuy] = useState([]);
  const userJSON = localStorage.getItem("userJSON");
  const user = JSON.parse(userJSON);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/cart/${userId}`);
      const data = await response.json();
      setBuy(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCart();
    console.log(user);
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    buy.forEach((item) => {
      totalPrice += item.price * item.times;
    });
    setTotal(totalPrice);
  }, [buy]);

  const edit = () => {
    navigate("/profile");
  };

  return (
    <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 1, maxWidth: 800, margin: "0 auto" }}>
      <Box sx={{ marginBottom: 2, padding: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mi información
        </Typography>
        <Typography>{user.username}</Typography>
        <Typography>{user.surname}</Typography>
        <Typography>{user.domicile}</Typography>
        <Typography>{user.phone}</Typography>
        <Button variant="contained" color="warning" onClick={edit} sx={{ marginTop: 2 }}>
          Editar
        </Button>
      </Box>

      <Box sx={{ marginBottom: 2, padding: 2, border: "1px solid #ddd", borderRadius: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Detalles del pedido
        </Typography>
        {buy.map((item) => (
          <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}>
            <Typography>
              {item.name} x {item.times}
            </Typography>
            <Typography>{item.price}€</Typography>
          </Box>
        ))}
        <Typography>Total: {total.toFixed(2)}€</Typography>
      </Box>

      <Box sx={{ border: "1px solid #ddd", borderRadius: 1, padding: 2 }}>
        <SummaryCart items={buy} pdf={true} />
      </Box>
    </Box>
  );
};

export default CheckPayment;
