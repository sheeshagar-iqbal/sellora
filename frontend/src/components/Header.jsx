
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Badge,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  // IMPORTANT: null when user is not logged in
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  // ================= GET USER =================

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/profile",
        {
          withCredentials: true,
        }
      );

      console.log("USER:", response.data);

      setUser(response.data);
    } catch (error) {
      console.log(
        "AUTH ERROR:",
        error.response?.data || error.message
      );

      // No valid login
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // ================= USER MENU =================

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ================= LOGOUT =================

  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:3000/user/logout",
        {
          withCredentials: true,
        }
      );

      setUser(null);
      handleClose();

      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#222",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "70px",
          px: { xs: 2, md: 5 },
        }}
      >
        {/* ================= LOGO ================= */}

        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          <Box
            component="img"
            src="/sellora.png"
            alt="Sellora"
            sx={{
              width: 120,
              height: "auto",
            }}
          />
        </Box>

        {/* =================================================
                    USER NOT LOGGED IN
        ================================================= */}

        {!user && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "#222",
                fontWeight: 600,
              }}
            >
              Login
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                px: 2.5,
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}

        {/* =================================================
                    USER LOGGED IN
        ================================================= */}

        {user && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* ================= WISHLIST ================= */}

            <IconButton
              onClick={() => navigate("/wishlist")}
              sx={{
                color: "#222",
              }}
            >
              <Badge
                badgeContent={0}
                color="error"
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            {/* ================= CART ================= */}

            <IconButton
              onClick={() => navigate("/cart")}
              sx={{
                color: "#222",
              }}
            >
              <Badge
                badgeContent={0}
                color="error"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {/* ================= USER ================= */}

            <IconButton
              onClick={handleMenu}
              sx={{
                ml: 1,
                p: 0.5,
              }}
            >
              {user?.image ? (
                <Avatar
                  src={user.image}
                  alt={user.username}
                  sx={{
                    width: 42,
                    height: 42,
                  }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{
                    fontSize: 42,
                  }}
                />
              )}
            </IconButton>

            {/* ================= DROPDOWN ================= */}

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* USER INFORMATION */}

              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: 220,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  {user?.image ? (
                    <Avatar
                      src={user.image}
                      alt={user.username}
                    />
                  ) : (
                    <AccountCircleIcon
                      sx={{ fontSize: 40 }}
                    />
                  )}

                  <Box>
                    <Typography
                      fontWeight={700}
                    >
                      {user?.username || "User"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* PROFILE */}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/userprofile");
                }}
              >
                Profile
              </MenuItem>

              {/* MY ACCOUNT */}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/myaccount");
                }}
              >
                My Account
              </MenuItem>

              {/* WISHLIST */}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/wishlist");
                }}
              >
                Wishlist
              </MenuItem>

              {/* CART */}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/cart");
                }}
              >
                My Cart
              </MenuItem>

              <Divider />

              {/* LOGOUT */}

              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

