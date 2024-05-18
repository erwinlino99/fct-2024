// App.js
import React from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Profile from "./components/user/Profile";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/user/Cart";
import Favourite from "./components/user/Favourite";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Profile />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
