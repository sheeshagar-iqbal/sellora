import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { addWishlist } from "../utils/addwishlist";
import { UserContext } from "../context/UserContext";

const ProductCards = ({ product }) => {
  const navigate = useNavigate();
  const { getProfile } = useContext(UserContext);

  const imageUrl = product?.images?.[0]
    ? `http://localhost:3000/upload/${product.images[0]}`
    : "https://via.placeholder.com/400x250?text=No+Image";

  const wishlistHandler = async (e) => {
    e.stopPropagation();

    try {
      await addWishlist(product._id);
      await getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      onClick={() => navigate(`/product/${product?._id}`)}
      sx={{
        width: "100%",
        maxWidth: 350,
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",

        border: "1px solid #E6E6E6",

        boxShadow: "0 3px 12px rgba(2,34,78,0.08)",

        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 28px rgba(2,34,78,0.16)",
        },
      }}
    >
      {/* ================= IMAGE ================= */}

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: 210,
            sm: 230,
          },
          backgroundColor: "#F5F5F5",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={product?.title || "Product"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",

            ".MuiCard-root:hover &": {
              transform: "scale(1.04)",
            },
          }}
        />

        {/* CONDITION */}

        {product?.condition && (
          <Chip
            label={product.condition}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,

              backgroundColor: "#fff",
              color: "#02224E",

              fontWeight: 700,

              borderRadius: 1.5,

              boxShadow:
                "0 2px 8px rgba(0,0,0,0.12)",

              "& .MuiChip-label": {
                px: 1.3,
              },
            }}
          />
        )}

        {/* WISHLIST */}

        <IconButton
          onClick={wishlistHandler}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,

            width: 40,
            height: 40,

            backgroundColor: "#fff",

            color: "#FD6B02",

            boxShadow:
              "0 3px 10px rgba(0,0,0,0.15)",

            "&:hover": {
              backgroundColor: "#FD6B02",
              color: "#fff",
            },
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* ================= CONTENT ================= */}

      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* PRICE */}

        <Typography
          variant="h6"
          fontWeight={800}
          sx={{
            mb: 0.5,
            color: "#FD6B02",
            fontSize: "21px",
          }}
        >
          ₹
          {Number(
            product?.price || 0
          ).toLocaleString("en-IN")}
        </Typography>

        {/* TITLE */}

        <Typography
          variant="body1"
          fontWeight={700}
          sx={{
            mb: 1.5,
            color: "#02224E",

            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product?.title || "Untitled Product"}
        </Typography>

        {/* CATEGORY + LOCATION */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            mb: 1.5,
          }}
        >
          {/* Category */}

          <Typography
            variant="body2"
            sx={{
              color: "#029FFE",
              fontWeight: 600,

              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.category || "Category"}
          </Typography>

          {/* Location */}

          <Typography
            variant="body2"
            sx={{
              color: "#666",

              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",

              maxWidth: "55%",
            }}
          >
            📍 {product?.location || "Location"}
          </Typography>
        </Box>

        {/* ================= SELLER ================= */}

        <Box
          sx={{
            marginTop: "auto",

            pt: 1.5,

            borderTop:
              "1px solid #E6E6E6",

            display: "flex",
            flexDirection: "column",
            gap: 0.3,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#888",
              fontWeight: 500,
            }}
          >
            Seller
          </Typography>

          <Typography
            variant="body2"
            fontWeight={700}
            sx={{
              color: "#02224E",

              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.seller?.name ||
              "Unknown Seller"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCards;