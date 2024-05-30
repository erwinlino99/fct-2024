// App.js
import React from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Profile from "./components/user/Profile";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/user/Cart";
import Favourite from "./components/user/Favourite";
import { useEffect, useState } from "react";
import RegisterPage from "./pages/RegisterPage";

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
        <Header />
        <Profile />
        <Routes>
          {!username && <Route path="/login" element={<LoginPage />} />}
          <Route path="/" element={<Products />} />
          <Route path="/:type" element={<Products />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
