import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import SummaryCart from "../user/SummaryCart";
const CheckPayment = () => {
  const userId = localStorage.getItem("userId");
  const [buy, setBuy] = useState([]);
  const userJSON = localStorage.getItem("userJSON");
  const user = JSON.parse(userJSON);
  const [total, setTotal] = useState(0); // Estado para almacenar el total
  
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
  return (
    <div style={{ backgroundColor: "white", height: 1200 }}>
      <div>
        <h1>Mi informacion</h1>
        <Typography>{user.username}</Typography>
        <Typography>{user.surname}</Typography>
        <Typography>{user.domicile}</Typography>
        <Typography>{user.phone}</Typography>
      </div>

      <div>
        <h1>Detalles del pedido</h1>
        {buy.map((item) => (
          <div key={item.id}>
            <Typography>
              {item.name} x {item.times}
            </Typography>
            <Typography>{item.price}€</Typography>
          </div>
        ))}
        <Typography>Total: {total.toFixed(2)}€</Typography>
      </div>
      <div>
        <h1>Metodo de pago</h1>
        <div>
          <Typography>Tarjeta</Typography>
        </div>
        <div>
          <Typography>Paypal</Typography>
        </div>
      </div>

      <div style={{ border: "solid 1px", width: "20rem" }}>
        <SummaryCart items={buy} pdf={true}></SummaryCart>
      </div>
    </div>
  );
};
export default CheckPayment;
