import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Container,
  Divider,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const AddToCart = () => {
  const [cart, setCart] = useState([]);

  const { getProfile } = useContext(UserContext);

  // ================= GET CART =================

  const getCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/addcard", {
        withCredentials: true,
      });

      setCart(res.data.cart || []);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to load cart");
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    getCart();
  }, []);

  // ================= UPDATE QUANTITY =================

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      await axios.put(
        `http://localhost:3000/addcard/${productId}`,
        {
          quantity: quantity,
        },
        {
          withCredentials: true,
        },
      );

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? {
                ...item,
                quantity: quantity,
              }
            : item,
        ),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update cart");
    }
  };

  // ================= REMOVE CART =================

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/addcard/${productId}`, {
        withCredentials: true,
      });

      setCart((prev) => prev.filter((item) => item.product._id !== productId));

      await getProfile();

      toast.success("Removed from cart 🛒");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to remove product");
    }
  };

  // ================= TOTAL =================

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );

  // ================= TOTAL ITEMS =================

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 55,
                height: 55,
                borderRadius: 3,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background: "linear-gradient(135deg, #02224E, #029FFE)",

                color: "#fff",
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#02224E",
                }}
              >
                My Cart
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  mt: 0.3,
                }}
              >
                Review your selected products
              </Typography>
            </Box>
          </Box>

          {cart.length > 0 && (
            <Chip
              label={`${totalItems} ${totalItems === 1 ? "Item" : "Items"}`}
              sx={{
                backgroundColor: "#fff",
                color: "#FD6B02",
                fontWeight: 800,
                fontSize: 14,
                px: 1,
                border: "1px solid #FD6B02",
              }}
            />
          )}
        </Box>

        {/* ================= EMPTY CART ================= */}

        {cart.length === 0 ? (
          <Box
            sx={{
              minHeight: 400,

              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",

              textAlign: "center",

              backgroundColor: "#fff",

              borderRadius: 4,

              border: "1px solid #E6E6E6",

              boxShadow: "0 8px 25px rgba(2,34,78,0.08)",

              px: 3,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                backgroundColor: "#E6E6E6",

                color: "#02224E",

                mb: 2,
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 55 }} />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#02224E",
              }}
            >
              Your cart is empty
            </Typography>

            <Typography
              sx={{
                color: "#777",
                mt: 1,
              }}
            >
              Add some products to your cart and they will appear here.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "flex-start",

              "@media (max-width:900px)": {
                flexDirection: "column",
              },
            }}
          >
            {/* =================================================
                LEFT - CART PRODUCTS
            ================================================= */}

            <Box
              sx={{
                flex: 1,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                {cart.map((item) => {
                  const product = item.product;

                  const imageUrl = product.images?.[0]
                    ? `http://localhost:3000/upload/${product.images[0]}`
                    : "/placeholder.jpg";

                  const productTotal = Number(product.price) * item.quantity;

                  return (
                    <Card
                      key={product._id}
                      sx={{
                        position: "relative",

                        display: "flex",

                        p: 2,

                        borderRadius: 4,

                        backgroundColor: "#fff",

                        border: "1px solid #E6E6E6",

                        boxShadow: "0 4px 15px rgba(2,34,78,0.07)",

                        transition: "all 0.3s ease",

                        "&:hover": {
                          transform: "translateY(-3px)",

                          boxShadow: "0 10px 25px rgba(2,34,78,0.13)",
                        },

                        "@media (max-width:600px)": {
                          flexDirection: "column",
                        },
                      }}
                    >
                      {/* ================= IMAGE ================= */}

                      <Box
                        sx={{
                          position: "relative",

                          width: 190,
                          height: 160,

                          flexShrink: 0,

                          "@media (max-width:600px)": {
                            width: "100%",
                            height: 220,
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={imageUrl}
                          alt={product.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",

                            borderRadius: 3,
                          }}
                        />

                        {product.condition && (
                          <Chip
                            label={product.condition}
                            size="small"
                            sx={{
                              position: "absolute",

                              top: 10,
                              left: 10,

                              backgroundColor: "#fff",

                              color: "#02224E",

                              fontWeight: 700,

                              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                            }}
                          />
                        )}
                      </Box>

                      {/* ================= DETAILS ================= */}

                      <CardContent
                        sx={{
                          flex: 1,
                          minWidth: 0,

                          px: {
                            xs: 0,
                            sm: 2.5,
                          },

                          py: {
                            xs: 2,
                            sm: 0,
                          },

                          "&:last-child": {
                            pb: {
                              xs: 0,
                              sm: 0,
                            },
                          },
                        }}
                      >
                        {/* TITLE */}

                        <Typography
                          sx={{
                            fontSize: 19,
                            fontWeight: 800,
                            color: "#02224E",

                            overflow: "hidden",

                            textOverflow: "ellipsis",

                            whiteSpace: "nowrap",
                          }}
                        >
                          {product.title}
                        </Typography>

                        {/* CATEGORY */}

                        <Typography
                          sx={{
                            color: "#029FFE",

                            fontWeight: 700,

                            fontSize: 14,

                            mt: 0.5,
                          }}
                        >
                          {product.category || "Product"}
                        </Typography>

                        {/* PRICE */}

                        <Typography
                          sx={{
                            fontSize: 21,
                            fontWeight: 800,

                            color: "#FD6B02",

                            mt: 1,
                          }}
                        >
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </Typography>

                        {/* LOCATION */}

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mt: 0.7,
                          }}
                        >
                          <LocationOnOutlinedIcon
                            sx={{
                              fontSize: 18,
                              color: "#FD6B02",
                            }}
                          />

                          <Typography
                            variant="body2"
                            sx={{
                              color: "#777",
                            }}
                          >
                            {product.location}
                          </Typography>
                        </Box>

                        {/* ================= QUANTITY ================= */}

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",

                            gap: 1,

                            mt: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#02224E",
                              mr: 0.5,
                            }}
                          >
                            Quantity
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",

                              border: "1px solid #E6E6E6",

                              borderRadius: 2,

                              overflow: "hidden",

                              backgroundColor: "#F8F8F8",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                updateQuantity(product._id, item.quantity - 1)
                              }
                              sx={{
                                width: 35,
                                height: 35,

                                color: "#02224E",

                                borderRadius: 0,

                                "&:hover": {
                                  backgroundColor: "#E6E6E6",
                                },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>

                            <Typography
                              sx={{
                                minWidth: 35,

                                textAlign: "center",

                                fontWeight: 800,

                                color: "#02224E",
                              }}
                            >
                              {item.quantity}
                            </Typography>

                            <IconButton
                              size="small"
                              onClick={() =>
                                updateQuantity(product._id, item.quantity + 1)
                              }
                              sx={{
                                width: 35,
                                height: 35,

                                color: "#FD6B02",

                                borderRadius: 0,

                                "&:hover": {
                                  backgroundColor: "#FFF0E6",
                                },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>

                        {/* REMOVE */}

                        <Button
                          startIcon={<DeleteIcon />}
                          onClick={() => removeFromCart(product._id)}
                          sx={{
                            mt: 1,

                            color: "#FD4702",

                            fontWeight: 700,

                            textTransform: "none",

                            px: 0,

                            "&:hover": {
                              backgroundColor: "transparent",

                              color: "#FD4702",
                            },
                          }}
                        >
                          Remove
                        </Button>
                      </CardContent>

                      {/* ================= PRODUCT TOTAL ================= */}

                      <Box
                        sx={{
                          minWidth: 130,

                          display: "flex",
                          flexDirection: "column",

                          alignItems: "flex-end",

                          justifyContent: "center",

                          pr: 1,

                          "@media (max-width:600px)": {
                            minWidth: "100%",

                            alignItems: "flex-start",

                            pr: 0,

                            pb: 1,
                          },
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#888",
                            fontWeight: 600,
                          }}
                        >
                          Product Total
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 800,
                            color: "#02224E",

                            mt: 0.5,
                          }}
                        >
                          ₹{productTotal.toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            {/* =================================================
                RIGHT - ORDER SUMMARY
            ================================================= */}

            <Card
              sx={{
                width: {
                  xs: "100%",
                  md: 350,
                },

                flexShrink: 0,

                p: 3,

                borderRadius: 4,

                backgroundColor: "#02224E",

                color: "#fff",

                boxShadow: "0 10px 30px rgba(2,34,78,0.22)",

                position: {
                  md: "sticky",
                },

                top: 20,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                }}
              >
                Order Summary
              </Typography>

              {/* ITEMS */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#D8E5F2",
                  }}
                >
                  Items
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {totalItems}
                </Typography>
              </Box>

              {/* SUBTOTAL */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#D8E5F2",
                  }}
                >
                  Subtotal
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  ₹{totalPrice.toLocaleString("en-IN")}
                </Typography>
              </Box>

              {/* DELIVERY */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#D8E5F2",
                  }}
                >
                  Delivery
                </Typography>

                <Typography
                  sx={{
                    color: "#7CFFB2",
                    fontWeight: 700,
                  }}
                >
                  FREE
                </Typography>
              </Box>

              <Divider
                sx={{
                  my: 2,
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              />

              {/* TOTAL */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: 700,
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: "#FD6B02",
                  }}
                >
                  ₹{totalPrice.toLocaleString("en-IN")}
                </Typography>
              </Box>

              {/* CHECKOUT */}

              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  py: 1.4,

                  borderRadius: 2.5,

                  background: "linear-gradient(135deg, #FD6B02, #FD4702)",

                  color: "#fff",

                  fontSize: 16,

                  fontWeight: 800,

                  textTransform: "none",

                  boxShadow: "0 6px 18px rgba(253,107,2,0.3)",

                  "&:hover": {
                    background: "linear-gradient(135deg, #FD4702, #FD6B02)",

                    transform: "translateY(-2px)",
                  },

                  transition: "all 0.2s ease",
                }}
              >
                Proceed to Checkout
              </Button>

              {/* TRUST */}

              <Box
                sx={{
                  mt: 3,
                  p: 1.5,

                  borderRadius: 2,

                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#D8E5F2",
                    lineHeight: 1.5,
                  }}
                >
                  🔒 Your cart is securely saved. Review your items before
                  checkout.
                </Typography>
              </Box>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AddToCart;
