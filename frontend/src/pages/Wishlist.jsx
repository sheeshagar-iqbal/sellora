import React, { useContext, useEffect, useState } from "react";

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
  Chip,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { toast } from "react-toastify";

import { addToCart } from "../utils/addcard";
import { UserContext } from "../context/UserContext";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const { getProfile } = useContext(UserContext);

  // ================= GET WISHLIST =================

  const getWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:3000/userwishlist", {
        withCredentials: true,
      });

      setWishlist(res.data.wishlist || []);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to load wishlist");
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    getWishlist();
  }, []);

  // ================= REMOVE WISHLIST =================

  const removeWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/userwishlist/${productId}`, {
        withCredentials: true,
      });

      // UI se immediately remove
      setWishlist((prev) =>
        prev.filter((product) => product._id !== productId),
      );

      await getProfile();

      toast.success("Removed from wishlist ❤️");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to remove");
    }
  };

  // ================= ADD TO CART =================

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);

      await getProfile();

      toast.success("Added to cart 🛒");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to add to cart");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E6E6E6",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* ================= HEADER ================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#02224E",
              }}
            >
              ❤️ My Wishlist
            </Typography>

            <Typography
              sx={{
                color: "#666",
                mt: 0.5,
              }}
            >
              Save your favourite products
            </Typography>
          </Box>

          {/* PRODUCT COUNT */}

          {wishlist.length > 0 && (
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: 3,
                backgroundColor: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#FD6B02",
                }}
              >
                {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
              </Typography>
            </Box>
          )}
        </Box>

        {/* ================= EMPTY WISHLIST ================= */}

        {wishlist.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,

              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",

              textAlign: "center",

              backgroundColor: "#fff",

              borderRadius: 4,

              border: "1px solid #E6E6E6",

              boxShadow: "0 5px 20px rgba(2,34,78,0.08)",

              px: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: 70,
                mb: 1,
              }}
            >
              💔
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#02224E",
              }}
            >
              Your wishlist is empty
            </Typography>

            <Typography
              sx={{
                color: "#777",
                mt: 1,
              }}
            >
              Save products you love and find them here later.
            </Typography>
          </Box>
        ) : (
          /* ================= PRODUCT CARDS ================= */

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: {
                xs: "center",
                sm: "flex-start",
              },
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
                    position: "relative",

                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.333% - 16px)",
                      lg: "calc(25% - 18px)",
                    },

                    borderRadius: 4,

                    overflow: "hidden",

                    backgroundColor: "#fff",

                    border: "1px solid #E6E6E6",

                    boxShadow: "0 4px 15px rgba(2,34,78,0.08)",

                    transition: "all 0.3s ease",

                    "&:hover": {
                      transform: "translateY(-6px)",

                      boxShadow: "0 12px 30px rgba(2,34,78,0.16)",
                    },
                  }}
                >
                  {/* ================= IMAGE ================= */}

                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 230,
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={imageUrl}
                      alt={product.title || "Product"}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",

                        ".MuiCard-root:hover &": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />

                    {/* CONDITION */}

                    {product.condition && (
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

                          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                        }}
                      />
                    )}

                    {/* REMOVE */}

                    <IconButton
                      onClick={() => removeWishlist(product._id)}
                      sx={{
                        position: "absolute",

                        top: 10,
                        right: 10,

                        width: 40,
                        height: 40,

                        backgroundColor: "#fff",

                        color: "#FD4702",

                        boxShadow: "0 3px 12px rgba(0,0,0,0.18)",

                        "&:hover": {
                          backgroundColor: "#FD4702",

                          color: "#fff",

                          transform: "scale(1.08)",
                        },

                        transition: "all 0.2s ease",
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  {/* ================= CONTENT ================= */}

                  <CardContent
                    sx={{
                      p: 2.2,
                    }}
                  >
                    {/* PRICE */}

                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#FD6B02",
                        mb: 0.5,
                      }}
                    >
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </Typography>

                    {/* TITLE */}

                    <Typography
                      sx={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#02224E",

                        overflow: "hidden",

                        textOverflow: "ellipsis",

                        whiteSpace: "nowrap",

                        mb: 1,
                      }}
                    >
                      {product.title || "Untitled Product"}
                    </Typography>

                    {/* CATEGORY */}

                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#029FFE",
                        mb: 0.7,
                      }}
                    >
                      {product.category || "Category"}
                    </Typography>

                    {/* LOCATION */}

                  

                    {/* ================= ADD CART ================= */}

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(product._id)}
                      sx={{
                        py: 1.2,

                        borderRadius: 2.5,

                        textTransform: "none",

                        fontWeight: 800,

                        fontSize: 15,

                        background: "linear-gradient(135deg, #FD6B02, #FD4702)",

                        boxShadow: "0 5px 15px rgba(253,107,2,0.22)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #FD4702, #FD6B02)",

                          transform: "translateY(-1px)",
                        },

                        transition: "all 0.2s ease",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Wishlist;
