import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Sellora
        </Typography>

        <Button color="inherit">
          Login
        </Button>

        <Button variant="contained">
          Sell
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;