import React, { useEffect, useState } from "react";
import { Button, SvgIcon, Menu, MenuItem, MenuList } from "@mui/material";
import { Link } from "react-router-dom";
import HeartIcon from "@mui/icons-material/FavoriteOutlined";
import LoginIcon from "@mui/icons-material/Person2";
import ShoppingIcon from "@mui/icons-material/ShoppingBasket";
import "../../styles/profile.css";

const Profile = () => {
  const [username, setUsername] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    window.location.href = "/";
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    setUsername(null);
    setUsername(null);

    handleMenuClose();
    window.location.href = "/";
  };

  return (
    <div className="profile">
      {username ? (
        <>
          <Button onClick={handleMenuClick}>
          <SvgIcon component={LoginIcon} fontSize="small" />
            Bienvenido,{username}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuList>
              <MenuItem onClick={handleMenuClose}>Ver Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <Link to="/login">
          <Button>
            <SvgIcon component={LoginIcon} fontSize="small" />
            Iniciar Sesión
          </Button>
        </Link>
      )}

      <Link to="/favourites">
        <Button>
          <SvgIcon component={HeartIcon} fontSize="small" /> Favoritos
        </Button>
      </Link>

      <Link to="/cart">
        <Button>
          <SvgIcon component={ShoppingIcon} fontSize="small" /> Carrito
        </Button>
      </Link>
    </div>
  );
};

export default Profile;
