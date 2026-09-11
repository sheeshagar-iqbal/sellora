import React, { useContext, useState } from "react";

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

import { UserContext } from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  // ================= COLORS =================

  const colors = {
    blue: "#02224E",
    orange: "#FD6B02",
    orangeDark: "#FD4702",
    gray: "#E6E6E6",
  };

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
      await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });

      setUser(null);
      handleClose();

      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    }
  };

  // ================= COUNTS =================

  const wishlistCount = user?.wishlist?.length || 0;

  // Total quantity
  const cartCount = user?.cart?.length || 0;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: colors.blue,
        color: "#fff",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 72 },
          px: { xs: 2, sm: 3, md: 5 },
          gap: 1,
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
              width: { xs: 100, sm: 115, md: 125 },
              height: "auto",

              // If your logo is dark, this makes it visible
              filter: "brightness(1) invert(1)",
            }}
          />
        </Box>

        {/* ================= NOT LOGGED IN ================= */}

        {!user && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            {/* LOGIN */}

            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                px: { xs: 1, sm: 2 },

                "&:hover": {
                  color: colors.orange,
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Login
            </Button>

            {/* SIGN UP */}

            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                backgroundColor: colors.orange,
                color: "#fff",
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                px: { xs: 1.5, sm: 2.5 },

                "&:hover": {
                  backgroundColor: colors.orangeDark,
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}

        {/* ================= LOGGED IN ================= */}

       

        {user  && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.3, sm: 0.8 },
            }}
          >
            {/* ================= WISHLIST ================= */}

            <IconButton
              onClick={() => navigate("/wishlist")}
              sx={{
                color: "#fff",
                width: 44,
                height: 44,

                "&:hover": {
                  color: colors.orange,
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <Badge
                badgeContent={wishlistCount}
                max={99}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: colors.orange,
                    color: "#fff",
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                    fontSize: 11,
                  },
                }}
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            {/* ================= CART ================= */}

            <IconButton
              onClick={() => navigate("/cart")}
              sx={{
                color: "#fff",
                width: 44,
                height: 44,

                "&:hover": {
                  color: colors.orange,
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <Badge
                badgeContent={cartCount}
                max={99}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: colors.orange,
                    color: "#fff",
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                    fontSize: 11,
                  },
                }}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {/* ================= SELL BUTTON ================= */}

            <Button
              variant="contained"
              onClick={() => navigate("/productinsert")}
              sx={{
                ml: { xs: 0.5, sm: 1.5 },
                px: { xs: 1.5, sm: 2.5 },
                py: 1,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                fontSize: { xs: 14, sm: 15 },

                backgroundColor: colors.orange,
                color: "#fff",

                boxShadow: "none",

                "&:hover": {
                  backgroundColor: colors.orangeDark,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
              }}
            >
              + Sell
            </Button>

            {/* ================= USER ================= */}

            <IconButton
              onClick={handleMenu}
              sx={{
                ml: { xs: 0.5, sm: 1 },
                p: 0.4,

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {user?.profileImage ? (
                <Avatar
                  src={`http://localhost:3000/upload/${user.profileImage}`}
                  alt={user?.name}
                  sx={{
                    width: 42,
                    height: 42,
                    border: `2px solid ${colors.orange}`,
                  }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{
                    fontSize: 42,
                    color: "#fff",
                  }}
                />
              )}
            </IconButton>

            {/* ================= DROPDOWN ================= */}

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  minWidth: 240,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                },
              }}
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
                  backgroundColor: "#fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  {user?.profileImage ? (
                    <Avatar
                      src={`http://localhost:3000/upload/${user.profileImage}`}
                      alt={user?.name}
                      sx={{
                        border: `2px solid ${colors.orange}`,
                      }}
                    />
                  ) : (
                    <AccountCircleIcon
                      sx={{
                        fontSize: 42,
                        color: colors.blue,
                      }}
                    />
                  )}

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      fontWeight={700}
                      sx={{
                        color: colors.blue,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 170,
                      }}
                    >
                      {user?.name || "User"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 170,
                      }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* PROFILE */}
               {user?.role === "admin" ?
          <MenuItem onClick={() => navigate("/admin")}>
            Admin Dashboard
          </MenuItem>:
          <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/userprofile");
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray,
                    color: colors.orange,
                  },
                }}
              >
                Profile
              </MenuItem>
        }
              
              

              {/* MY ACCOUNT */}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/myaccount");
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray,
                    color: colors.orange,
                  },
                }}
              >
                My Account
              </MenuItem>

              {/* MY ADS */}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/myads");
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray,
                    color: colors.orange,
                  },
                }}
              >
                My Ads
              </MenuItem>

              {/* WISHLIST */}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/wishlist");
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray,
                    color: colors.orange,
                  },
                }}
              >
                Wishlist ({wishlistCount})
              </MenuItem>

              {/* CART */}

              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/cart");
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: colors.gray,
                    color: colors.orange,
                  },
                }}
              >
                My Cart ({cartCount})
              </MenuItem>

              <Divider />

              {/* LOGOUT */}

              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "#d32f2f",
                  fontWeight: 600,

                  "&:hover": {
                    backgroundColor: "#ffebee",
                  },
                }}
              >
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
