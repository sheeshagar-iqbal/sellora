import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCards = ({ product }) => {
  const navigate = useNavigate();

  const imageUrl = product?.images?.[0]
    ? `http://localhost:3000/upload/${product.images[0]}`
    : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <Card
      onClick={() => navigate(`/product/${product?._id}`)}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        height: "100%",
        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      {/* IMAGE */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={imageUrl}
          alt={product?.title}
          sx={{
            objectFit: "cover",
          }}
        />

        {product?.condition && (
          <Chip
            label={product.condition}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "white",
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ p: 2 }}>

        {/* ROW 1 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            ₹{Number(product?.price || 0).toLocaleString("en-IN")}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxWidth: "45%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.category}
          </Typography>
        </Box>

        {/* ROW 2 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={500}
            sx={{
              maxWidth: "55%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxWidth: "40%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.location}
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
};

export default ProductCards;