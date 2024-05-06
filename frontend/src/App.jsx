// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Products from "./components/Products";
import Profile from "./components/profile/Profile"; 
import Ejemplo from "./components/Ejemplo";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Profile /> 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Header />
      <Products /> 
      {/* 
      
      
      */}
    </div>
  );
}

export default App;
