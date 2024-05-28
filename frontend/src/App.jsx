// App.js
import React from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Profile from "./components/user/Profile";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/user/Cart";
import Favourite from "./components/user/Favourite";
import { useEffect,useState } from "react";
import RegisterPage from "./pages/RegisterPage";

function App() {

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Profile />
       <Products></Products>
        <Routes>
        {!username && (
            <Route path="/login" element={<LoginPage />} />
          )}
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
