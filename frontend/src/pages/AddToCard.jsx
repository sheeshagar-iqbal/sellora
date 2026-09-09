import React, { useEffect, useState } from "react";
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
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "react-toastify";

const AddToCart = () => {

  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {

      const res = await axios.get(
        "http://localhost:3000/addcard",
        {
          withCredentials: true,
        }
      );

      setCart(res.data.cart);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to load cart"
      );

    }
  };

  useEffect(() => {
    getCart();
  }, []);


  // Update quantity
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
        }
      );

      setCart(prev =>
        prev.map(item =>
          item.product._id === productId
            ? {
                ...item,
                quantity: quantity,
              }
            : item
        )
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to update cart"
      );

    }
  };


  // Remove cart
  const removeFromCart = async (productId) => {

    try {

      await axios.delete(
        `http://localhost:3000/addcard/${productId}`,
        {
          withCredentials: true,
        }
      );

      setCart(prev =>
        prev.filter(
          item => item.product._id !== productId
        )
      );

      toast.success("Removed from cart 🛒");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to remove product"
      );

    }
  };


  // Total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.product.price) * item.quantity,
    0
  );


  return (

    <Container sx={{ py: 5 }}>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
      >
        🛒 My Cart
      </Typography>


      {cart.length === 0 ? (

        <Typography>
          Your cart is empty.
        </Typography>

      ) : (

        <Box>

          {cart.map(item => {

            const product = item.product;

            return (

              <Card
                key={product._id}
                sx={{
                  display: "flex",
                  mb: 3,
                  p: 2,
                }}
              >

                <CardMedia
                  component="img"
                  sx={{
                    width: 180,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                  image={
                    product.images?.[0]
                      ? `http://localhost:3000/upload/${product.images[0]}`
                      : "/placeholder.jpg"
                  }
                  alt={product.title}
                />


                <CardContent sx={{ flex: 1 }}>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    color="primary"
                    fontWeight={700}
                    mt={1}
                  >
                    ₹{product.price}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    {product.location}
                  </Typography>


                  {/* Quantity */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      gap: 1,
                    }}
                  >

                    <IconButton
                      size="small"
                      onClick={() =>
                        updateQuantity(
                          product._id,
                          item.quantity - 1
                        )
                      }
                    >
                      <RemoveIcon />
                    </IconButton>


                    <Typography
                      fontWeight={700}
                    >
                      {item.quantity}
                    </Typography>


                    <IconButton
                      size="small"
                      onClick={() =>
                        updateQuantity(
                          product._id,
                          item.quantity + 1
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>

                  </Box>


                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() =>
                      removeFromCart(product._id)
                    }
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>

                </CardContent>


                {/* Product total */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pr: 2,
                  }}
                >

                  <Typography
                    fontWeight={700}
                  >
                    ₹
                    {Number(product.price) *
                      item.quantity}
                  </Typography>

                </Box>

              </Card>

            );
          })}


          <Divider sx={{ my: 3 }} />


          {/* Grand Total */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Total Price: ₹{totalPrice}
            </Typography>

          </Box>


          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >

            <Button
              variant="contained"
              size="large"
            >
              Proceed to Checkout
            </Button>

          </Box>

        </Box>

      )}

    </Container>
  );
};

export default AddToCart;