import React from "react";
import { Box, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: 750,
        mx: "auto",
        background: "white",
        borderRadius: 3,
        p: 1,
        boxShadow: 3,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search mobiles, cars, bikes, furniture..."
        variant="outlined"
        size="small"
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          ml: 1,
          px: 4,
          borderRadius: 2,
          textTransform: "none",
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;