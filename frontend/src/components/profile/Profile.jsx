// Profile.js
import React from "react";
import { Button, SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";
import HeartIcon from "@mui/icons-material/FavoriteOutlined";
import LoginIcon from "@mui/icons-material/Person2";
import ShoppingIcon from "@mui/icons-material/ShoppingBasket";
import "../../styles/profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <Link to="/login">
        <Button>
          <SvgIcon component={LoginIcon} fontSize="small" />
          Iniciar Sesión
        </Button>
      </Link>

      <Button>
        <SvgIcon component={HeartIcon} fontSize="small" /> Favoritos
      </Button>
      <Button>
        <SvgIcon component={ShoppingIcon} fontSize="small" /> Carrito
      </Button>
    </div>
  );
};

export default Profile;
