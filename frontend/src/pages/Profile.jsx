
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCards from "../components/ProductCards";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/profile",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.data || response.data);
        // console.log(response.data.data || response.data);

      } catch (error) {
        console.log(
          "Profile error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    const getProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/myproduct",
          {
            withCredentials: true,
          }
        );

        setProducts(response.data.data || response.data);
      } catch (error) {
        console.log(
          "Products error:",
          error.response?.data || error.message
        );
      }
    };

    getProfile();
    getProducts();
  }, []);

  // Logout
  const logoutHandler = async () => {
    try {
      await axios.get(
        "http://localhost:3000/user/logout",
        {
          withCredentials: true,
        }
      );

      toast.success("Logout successfully");
      navigate("/login");
    } catch (error) {
      console.log(
        "Logout error:",
        error.response?.data || error.message
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#E6E6E6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "5px solid #E6E6E6",
              borderTop: "5px solid #FD6B02",
              animation: "spin 1s linear infinite",
              mx: "auto",
              mb: 2,
              "@keyframes spin": {
                from: {
                  transform: "rotate(0deg)",
                },
                to: {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />

          <Typography
            sx={{
              color: "#02224E",
              fontWeight: 700,
            }}
          >
            Loading Profile...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#E6E6E6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 450,
            width: "100%",
            borderRadius: 4,
            textAlign: "center",
            p: 4,
            border: "1px solid #E6E6E6",
            boxShadow: "0 15px 40px rgba(2,34,78,0.12)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #02224E, #029FFE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 35,
              mx: "auto",
              mb: 2,
            }}
          >
            👤
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#02224E",
            }}
          >
            Please Login First
          </Typography>

          <Typography
            sx={{
              color: "#666",
              mt: 1,
              mb: 3,
            }}
          >
            Login to view your Sellora profile and products.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              py: 1.4,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 800,
              fontSize: 16,
              background:
                "linear-gradient(135deg, #FD6B02, #FD4702)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #FD4702, #FD6B02)",
              },
            }}
          >
            Login
          </Button>
        </Card>
      </Box>
    );
  }

  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "Not available";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E6E6E6",
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Container maxWidth="xl">

        {/* ================= PROFILE CARD ================= */}

        <Card
          sx={{
            width: "100%",
            maxWidth: 1000,
            mx: "auto",
            borderRadius: 5,
            overflow: "hidden",
            backgroundColor: "#fff",
            border: "1px solid #E6E6E6",
            boxShadow:
              "0 15px 45px rgba(2,34,78,0.12)",
          }}
        >

          {/* COVER */}

          <Box
            sx={{
              height: {
                xs: 150,
                sm: 180,
                md: 210,
              },

              background:
                "linear-gradient(135deg, #02224E 0%, #029FFE 100%)",

              position: "relative",
              overflow: "hidden",

              "&::before": {
                content: '""',
                position: "absolute",
                width: 250,
                height: 250,
                borderRadius: "50%",
                backgroundColor:
                  "rgba(255,255,255,0.08)",
                top: -120,
                right: -50,
              },

              "&::after": {
                content: '""',
                position: "absolute",
                width: 180,
                height: 180,
                borderRadius: "50%",
                backgroundColor:
                  "rgba(253,107,2,0.25)",
                bottom: -100,
                left: -50,
              },
            }}
          />

          <CardContent
            sx={{
              px: {
                xs: 2,
                sm: 4,
                md: 6,
              },
              pb: 5,
            }}
          >

            {/* PROFILE IMAGE */}

            <Box
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                },
                mt: -8,
                position: "relative",
                zIndex: 2,
              }}
            >
              <Avatar
                src={`http://localhost:3000/upload/${user.profileImage}`|| ""}
                alt={user?.name || "User"}
                sx={{
                  width: {
                    xs: 110,
                    sm: 135,
                  },
                  height: {
                    xs: 110,
                    sm: 135,
                  },

                  fontSize: 45,

                  bgcolor: "#FD6B02",

                  border:
                    "6px solid #fff",

                  boxShadow:
                    "0 8px 25px rgba(2,34,78,0.25)",
                }}
              >
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </Avatar>
            </Box>

            {/* NAME */}

            <Box
              sx={{
                mt: 2,
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "#02224E",
                  fontSize: {
                    xs: 28,
                    sm: 34,
                  },
                }}
              >
                {user?.name || "Sellora User"}
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  mt: 0.5,
                }}
              >
                {user?.email || "Email not available"}
              </Typography>

              {/* MEMBER BADGE */}

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.7,
                  mt: 1.5,
                  px: 1.5,
                  py: 0.7,
                  borderRadius: 5,
                  backgroundColor: "#EAF7FF",
                  color: "#029FFE",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                ✓ Sellora Member
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* ================= STATS ================= */}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 4,
              }}
            >
              <Box
                sx={{
                  flex: "1 1 180px",
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: "#F8FBFF",
                  border:
                    "1px solid #E6E6E6",
                  transition: "0.25s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 8px 20px rgba(2,34,78,0.10)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#FD6B02",
                  }}
                >
                  {products.length}
                </Typography>

                <Typography
                  sx={{
                    color: "#02224E",
                    fontWeight: 700,
                  }}
                >
                  My Products
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: "1 1 180px",
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: "#F8FBFF",
                  border:
                    "1px solid #E6E6E6",
                  transition: "0.25s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 8px 20px rgba(2,34,78,0.10)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#029FFE",
                  }}
                >
                  {createdDate}
                </Typography>

                <Typography
                  sx={{
                    color: "#02224E",
                    fontWeight: 700,
                  }}
                >
                  Member Since
                </Typography>
              </Box>
            </Box>

            {/* ================= PERSONAL INFO ================= */}

            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 900,
                color: "#02224E",
              }}
            >
              Personal Information
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >

              {/* NAME */}

              <Box
                sx={{
                  flex: "1 1 300px",
                  p: 2.2,
                  borderRadius: 3,
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E6E6E6",
                }}
              >
                <Typography
                  sx={{
                    color: "#029FFE",
                    fontSize: 13,
                    fontWeight: 800,
                    mb: 0.5,
                  }}
                >
                  FULL NAME
                </Typography>

                <Typography
                  sx={{
                    color: "#02224E",
                    fontWeight: 700,
                    fontSize: 17,
                  }}
                >
                  {user?.name || "Not available"}
                </Typography>
              </Box>

              {/* EMAIL */}

              <Box
                sx={{
                  flex: "1 1 300px",
                  p: 2.2,
                  borderRadius: 3,
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E6E6E6",
                }}
              >
                <Typography
                  sx={{
                    color: "#029FFE",
                    fontSize: 13,
                    fontWeight: 800,
                    mb: 0.5,
                  }}
                >
                  EMAIL
                </Typography>

                <Typography
                  sx={{
                    color: "#02224E",
                    fontWeight: 700,
                    fontSize: 17,
                    wordBreak: "break-word",
                  }}
                >
                  {user?.email || "Not available"}
                </Typography>
              </Box>

              {/* PHONE */}

              <Box
                sx={{
                  flex: "1 1 300px",
                  p: 2.2,
                  borderRadius: 3,
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E6E6E6",
                }}
              >
                <Typography
                  sx={{
                    color: "#029FFE",
                    fontSize: 13,
                    fontWeight: 800,
                    mb: 0.5,
                  }}
                >
                  PHONE
                </Typography>

                <Typography
                  sx={{
                    color: "#02224E",
                    fontWeight: 700,
                    fontSize: 17,
                  }}
                >
                  {user?.phone || "Not available"}
                </Typography>
              </Box>

              {/* ADDRESS */}

              <Box
                sx={{
                  flex: "1 1 300px",
                  p: 2.2,
                  borderRadius: 3,
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E6E6E6",
                }}
              >
                <Typography
                  sx={{
                    color: "#029FFE",
                    fontSize: 13,
                    fontWeight: 800,
                    mb: 0.5,
                  }}
                >
                  ADDRESS
                </Typography>

                <Typography
                  sx={{
                    color: "#02224E",
                    fontWeight: 700,
                    fontSize: 17,
                  }}
                >
                  {user?.address || "Not available"}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* ================= ACTION BUTTONS ================= */}

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Button
                fullWidth
                size="large"
                onClick={() =>
                  navigate("/edit-profile")
                }
                sx={{
                  py: 1.4,
                  borderRadius: 3,
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: 16,
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, #FD6B02, #FD4702)",

                  "&:hover": {
                    transform: "translateY(-2px)",
                    background:
                      "linear-gradient(135deg, #FD4702, #FD6B02)",
                    boxShadow:
                      "0 8px 20px rgba(253,107,2,0.25)",
                  },

                  transition: "0.25s",
                }}
              >
                ✏️ Edit Profile
              </Button>

              <Button
                fullWidth
                size="large"
                onClick={logoutHandler}
                sx={{
                  py: 1.4,
                  borderRadius: 3,
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: 16,
                  color: "#FD4702",
                  border:
                    "2px solid #FD4702",

                  "&:hover": {
                    backgroundColor: "#FD4702",
                    color: "#fff",
                    transform: "translateY(-2px)",
                  },

                  transition: "0.25s",
                }}
              >
                🚪 Logout
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* ================= MY PRODUCTS ================= */}

        <Box
          sx={{
            mt: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "#02224E",
                  fontSize: {
                    xs: 25,
                    sm: 32,
                  },
                }}
              >
                My Products
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  mt: 0.5,
                }}
              >
                Products you have listed on Sellora
              </Typography>
            </Box>

            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: 3,
                backgroundColor: "#fff",
                border:
                  "1px solid #E6E6E6",
                boxShadow:
                  "0 4px 12px rgba(2,34,78,0.06)",
              }}
            >
              <Typography
                sx={{
                  color: "#FD6B02",
                  fontWeight: 900,
                }}
              >
                {products.length} Listings
              </Typography>
            </Box>
          </Box>

          {products.length > 0 ? (
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
              {products.map((product) => (
                <Box
                  key={product._id || product.id}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.333% - 16px)",
                      lg: "calc(25% - 18px)",
                    },
                    minWidth: 0,
                  }}
                >
                  <ProductCards product={product} />
                </Box>
              ))}
            </Box>
          ) : (
            <Card
              sx={{
                borderRadius: 4,
                textAlign: "center",
                py: 7,
                px: 2,
                border:
                  "1px solid #E6E6E6",
                boxShadow:
                  "0 8px 25px rgba(2,34,78,0.06)",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "#EAF7FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 35,
                  mx: "auto",
                  mb: 2,
                }}
              >
                📦
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#02224E",
                }}
              >
                No Products Yet
              </Typography>

              <Typography
                sx={{
                  color: "#666",
                  mt: 1,
                }}
              >
                You haven't listed any products on Sellora.
              </Typography>

              <Button
                onClick={() => navigate("/sell")}
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.2,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 800,
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, #FD6B02, #FD4702)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #FD4702, #FD6B02)",
                  },
                }}
              >
                + Sell Product
              </Button>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;

