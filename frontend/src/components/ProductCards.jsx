import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const ProductCards = ({ product }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 5,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={product?.image}
          alt={product?.title}
          sx={{ objectFit: "cover" }}
        />

        <IconButton
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            background: "white",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          ₹{product?.price}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product?.title}
        </Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <LocationOnOutlinedIcon fontSize="small" />

          <Typography variant="body2" color="text.secondary">
            {product?.location}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCards;