import React from "react";

import {
  Box,
  Typography,
} from "@mui/material";

const categories = [
  { name: "ALL", icon: "🌐" },
  { name: "Mobiles", icon: "📱" },
  { name: "Cars", icon: "🚗" },
  { name: "Bikes", icon: "🏍️" },
  { name: "Electronics", icon: "💻" },
  { name: "Furniture", icon: "🛋️" },
  { name: "Fashion", icon: "👕" },
  { name: "Properties", icon: "🏠" },
  { name: "Jobs", icon: "💼" },
];

const Category = ({
  onCategorySelect,
  selectedCategory,
}) => {
  return (
    <Box sx={{ mb: 4 }}>

      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 800,
          color: "#02224E",
          textAlign:"center",
          mb: 2,
        }}
      >
        Browse Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          // alignItems:"center",
          justifyContent:"center",
          gap: 2,
          overflowX: "auto",
          pb: 1.5,

          "&::-webkit-scrollbar": {
            height: 5,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#029FFE",
            borderRadius: 10,
          },
        }}
      >
        {categories.map((category) => {

          const isActive =
            category.name === "ALL"
              ? selectedCategory === ""
              : selectedCategory === category.name;

          return (
            <Box
              key={category.name}
              onClick={() =>
                onCategorySelect(category.name)
              }
              sx={{
                minWidth: 110,
                px: 2,
                py: 1.8,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                borderRadius: 3,

                cursor: "pointer",

                backgroundColor: isActive
                  ? "#02224E"
                  : "#fff",

                border: isActive
                  ? "2px solid #FD6B02"
                  : "1px solid #E6E6E6",

                boxShadow: isActive
                  ? "0 8px 20px rgba(2,34,78,0.18)"
                  : "0 3px 10px rgba(2,34,78,0.06)",

                transition:
                  "all 0.25s ease",

                "&:hover": {
                  transform:
                    "translateY(-4px)",

                  backgroundColor:
                    "#02224E",

                  borderColor:
                    "#FD6B02",

                  "& .category-name": {
                    color: "#fff",
                  },
                },
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: isActive
                    ? "#FD6B02"
                    : "#E6E6E6",

                  fontSize: 25,

                  mb: 1,
                }}
              >
                {category.icon}
              </Box>

              <Typography
                className="category-name"
                sx={{
                  fontSize: 14,
                  fontWeight: 700,

                  color: isActive
                    ? "#fff"
                    : "#02224E",

                  transition:
                    "color 0.2s ease",
                }}
              >
                {category.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Category;