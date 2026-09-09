
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import { addToCart } from "../utils/addcard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Get Wishlist
  const getWishlist = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/userwishlist",
        {
          withCredentials: true,
        }
      );

      setWishlist(res.data.wishlist);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load wishlist"
      );
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // Remove Wishlist
  const removeWishlist = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3000/userwishlist/${productId}`,
        {
          withCredentials: true,
        }
      );

      setWishlist((prev) =>
        prev.filter(
          (product) => product._id !== productId
        )
      );

      toast.success("Removed from wishlist ❤️");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to remove"
      );
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        ❤️ My Wishlist
      </Typography>

      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <Typography color="text.secondary">
          Your wishlist is empty.
        </Typography>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {wishlist.map((product) => {
            const imageUrl = product.images?.[0]
              ? `http://localhost:3000/upload/${product.images[0]}`
              : "/placeholder.jpg";

            return (
              <Card
                key={product._id}
                sx={{
                  width: "100%",
                  minHeight: 150,

                  display: "flex",
                  alignItems: "center",

                  p: 2,
                  borderRadius: 3,

                  boxSizing: "border-box",

                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.08)",

                  transition: "0.3s",

                  "&:hover": {
                    boxShadow:
                      "0 6px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* =========================
                    LEFT - IMAGE
                ========================== */}
                <CardMedia
                  component="img"
                  image={imageUrl}
                  alt={product.title}
                  sx={{
                    width: 160,
                    height: 120,

                    objectFit: "cover",

                    borderRadius: 2,

                    flexShrink: 0,
                  }}
                />

                {/* =========================
                    MIDDLE - DETAILS
                ========================== */}
                <CardContent
                  sx={{
                    flex: 1,
                    minWidth: 0,

                    px: 3,
                    py: 0,

                    "&:last-child": {
                      pb: 0,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    noWrap
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    color="primary"
                    fontWeight={700}
                    fontSize={20}
                    mt={0.5}
                  >
                    ₹{product.price}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                  >
                    📍 {product.location}
                  </Typography>

                  {/* Add To Cart */}
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      mt: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    onClick={() =>
                      addToCart(product._id)
                    }
                  >
                    Add to Cart
                  </Button>
                </CardContent>

                {/* =========================
                    RIGHT - REMOVE
                ========================== */}
                <IconButton
                  color="error"
                  onClick={() =>
                    removeWishlist(product._id)
                  }
                  sx={{
                    width: 45,
                    height: 45,

                    flexShrink: 0,

                    mr: 1,

                    "&:hover": {
                      backgroundColor:
                        "rgba(244,67,54,0.1)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Card>
            );
          })}
        </Box>
      )}
    </Container>
  );
};

export default Wishlist;
