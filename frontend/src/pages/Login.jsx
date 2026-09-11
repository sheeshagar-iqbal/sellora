import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      setUser(res.data.user);

      toast.success("Login successfully");

      res.data.user.role==="admin"?navigate('/admin'): navigate("/");

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E6E6E6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 0, sm: 3 },
      }}
    >
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: "1100px",
            minHeight: { xs: "100vh", sm: "650px" },
            display: "flex",
            overflow: "hidden",
            borderRadius: { xs: 0, sm: 4 },
          }}
        >
          {/* ================================================= */}
          {/* LEFT SIDE - SELLORA BRANDING */}
          {/* ================================================= */}

          <Box
            sx={{
              width: "50%",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(145deg, #02224E 0%, #029FFE 100%)",
              color: "#fff",
              p: 5,
            }}
          >
            {/* Decorative Circle 1 */}

            <Box
              sx={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                backgroundColor:
                  "rgba(255,255,255,0.08)",
                top: -100,
                left: -100,
              }}
            />

            {/* Decorative Circle 2 */}

            <Box
              sx={{
                position: "absolute",
                width: 250,
                height: 250,
                borderRadius: "50%",
                backgroundColor:
                  "rgba(253,107,2,0.18)",
                bottom: -80,
                right: -70,
              }}
            />

            {/* Logo */}

            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                backgroundColor: "#fff",
                borderRadius: 3,
                px: 4,
                py: 2,
                mb: 4,
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <Box
                component="img"
                src="/sellora.png"
                alt="Sellora"
                sx={{
                  width: "190px",
                  maxWidth: "100%",
                  display: "block",
                }}
              />
            </Box>

            {/* Main Text */}

            <Typography
              variant="h3"
              fontWeight="800"
              textAlign="center"
              sx={{
                position: "relative",
                zIndex: 2,
                fontSize: {
                  md: "38px",
                  lg: "44px",
                },
              }}
            >
              Buy. Sell. Discover.
            </Typography>

            <Typography
              sx={{
                position: "relative",
                zIndex: 2,
                mt: 2,
                maxWidth: 420,
                textAlign: "center",
                color:
                  "rgba(255,255,255,0.85)",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              Welcome back to Sellora. Login to
              continue buying, selling and discovering
              great deals.
            </Typography>

            {/* Features */}

            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                gap: 1.5,
                mt: 4,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {[
                "Easy Buying",
                "Easy Selling",
                "Reliable Deals",
              ].map((item) => (
                <Box
                  key={item}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 5,
                    backgroundColor:
                      "rgba(255,255,255,0.12)",
                    border:
                      "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography
                    fontSize="13px"
                    fontWeight="600"
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ================================================= */}
          {/* RIGHT SIDE - LOGIN FORM */}
          {/* ================================================= */}

          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              p: {
                xs: 3,
                sm: 5,
                md: 6,
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "450px",
              }}
            >
              {/* Mobile Logo */}

              <Box
                sx={{
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                  justifyContent: "center",
                  mb: 4,
                }}
              >
                <Box
                  component="img"
                  src="/sellora.png"
                  alt="Sellora"
                  sx={{
                    width: "160px",
                  }}
                />
              </Box>

              {/* Heading */}

              <Box mb={3}>
                <Typography
                  variant="h4"
                  fontWeight="800"
                  sx={{
                    color: "#02224E",
                    fontSize: {
                      xs: "28px",
                      sm: "32px",
                    },
                  }}
                >
                  Welcome Back
                </Typography>

                <Typography
                  sx={{
                    mt: 0.8,
                    color: "#777",
                  }}
                >
                  Login to your Sellora account
                </Typography>
              </Box>

              {/* ================================================= */}
              {/* LOGIN FORM */}
              {/* ================================================= */}

              <Box
                component="form"
                onSubmit={submitHandler}
              >
                {/* Email */}

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={changeHandler}
                  margin="normal"
                  required
                  placeholder="Enter your email"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset":
                      {
                        borderColor: "#029FFE",
                      },

                    "& .MuiInputLabel-root.Mui-focused":
                      {
                        color: "#029FFE",
                      },
                  }}
                />

                {/* Password */}

                <Box
                  sx={{
                    position: "relative",
                    mt: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={changeHandler}
                    required
                    placeholder="Enter your password"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused fieldset":
                        {
                          borderColor: "#029FFE",
                        },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color: "#029FFE",
                        },
                    }}
                  />
                

                  {/* Eye Button */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      border: "none",
                      background:
                        "transparent",
                      cursor: "pointer",
                      fontSize: "20px",
                      zIndex: 2,
                      padding: "5px",
                    }}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </button>
                </Box>


                  {/* forget password */}
                  
              <Typography
                textAlign="center"
                mt={2}
               
                sx={{
                  color: "#777",
                  marginTop:"8px"
                  
                }}
              >
                Don't know about password?{" "}

                <Link
                  to="/forget"
                  style={{
                    color: "#029FFE",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  Forget Password
                </Link>
              </Typography>

                {/* Login Button */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "700",

                    background:
                      "linear-gradient(90deg, #FD6B02, #FD4702)",

                    boxShadow:
                      "0 8px 20px rgba(253,107,2,0.25)",

                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #FD4702, #FD6B02)",

                      boxShadow:
                        "0 10px 25px rgba(253,107,2,0.35)",
                    },
                  }}
                >
                  Login
                </Button>
              </Box>

              {/* Signup */}

              <Typography
                textAlign="center"
                mt={3}
                sx={{
                  color: "#777",
                  marginTop:"8px"

                }}
              >
                Don't have an account?{" "}

                <Link
                  to="/signup"
                  style={{
                    color: "#029FFE",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;