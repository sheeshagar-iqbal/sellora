import React, { useState } from "react";

import {
  Box,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

const SearchBar = ({
  onSearch,
  currentSearch = "",
}) => {

  const [search, setSearch] =
    useState(currentSearch);

  const handleSearch = () => {
    onSearch(search);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 850,
        mx: "auto",
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,

          p: 1,

          backgroundColor: "#fff",

          borderRadius: 4,

          border:
            "2px solid #E6E6E6",

          boxShadow:
            "0 8px 25px rgba(2,34,78,0.08)",

          transition:
            "all 0.25s ease",

          "&:focus-within": {
            borderColor: "#029FFE",

            boxShadow:
              "0 8px 30px rgba(2,34,78,0.14)",
          },

          "@media (max-width:600px)": {
            flexDirection: "column",
            p: 1.5,
          },
        }}
      >
        <TextField
          fullWidth
          placeholder="Search title, category or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={handleKeyDown}
          variant="outlined"
          size="medium"

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    fontSize: 22,
                  }}
                >
                  🔍
                </Box>
              </InputAdornment>
            ),
          }}

          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,

              "& fieldset": {
                border: "none",
              },
            },

            "& .MuiInputBase-input": {
              fontSize: 16,
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            minWidth: 130,

            borderRadius: 3,

            background:
              "linear-gradient(135deg, #FD6B02, #FD4702)",

            color: "#fff",

            fontWeight: 800,

            textTransform: "none",

            fontSize: 16,

            boxShadow:
              "0 5px 15px rgba(253,107,2,0.25)",

            "&:hover": {
              background:
                "linear-gradient(135deg, #FD4702, #FD6B02)",

              transform:
                "translateY(-1px)",
            },

            transition:
              "all 0.2s ease",

            "@media (max-width:600px)": {
              width: "100%",
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;