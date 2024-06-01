// App.js
import React from "react";
import Header from "./components/general/Header";
import Products from "./components/Products";
import Profile from "./components/user/Profile";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/user/Cart";
import Favourite from "./components/user/Favourite";
import { useEffect, useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import CustomProfile from "./components/user/CustomProfile";
import DetailsProducts from "./components/DetailsProduct";
import CheckPayment from "./components/buy/CheckPayment";
import SelectCategory from "./components/general/SelectCategory";
function App() {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");

    if (storedUsername || storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
      console.log("id--->", storedUserId);
      console.log("usuario--->", storedUsername);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Profile />
        <Header />
        <Routes>
          {!username && <Route path="/login" element={<LoginPage />} />}
          <Route path="/" element={<SelectCategory />} />
          <Route path="/:category" element={<Products />} />
          <Route path="/test" element={<Products />} />
          <Route path="/products/:id" element={<DetailsProducts />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<CustomProfile />} />
          <Route path="/payment" element={<CheckPayment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
