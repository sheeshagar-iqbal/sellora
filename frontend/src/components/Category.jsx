import React from "react";
import { Box, Typography } from "@mui/material";

const categories = [
  { name: "Mobiles", icon: "📱" },
  { name: "Cars", icon: "🚗" },
  { name: "Bikes", icon: "🏍️" },
  { name: "Electronics", icon: "💻" },
  { name: "Furniture", icon: "🛋️" },
  { name: "Fashion", icon: "👕" },
  { name: "Properties", icon: "🏠" },
  { name: "Jobs", icon: "💼" },
];

const Category = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        pb: 2,
      }}
    >
      {categories.map((category) => (
        <Box
          key={category.name}
          sx={{
            minWidth: 110,
            textAlign: "center",
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 3,
            cursor: "pointer",
            "&:hover": {
              borderColor: "#1976d2",
              transform: "translateY(-3px)",
            },
          }}
        >
          <Typography fontSize={35}>
            {category.icon}
          </Typography>

          <Typography fontWeight={500}>
            {category.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Category;