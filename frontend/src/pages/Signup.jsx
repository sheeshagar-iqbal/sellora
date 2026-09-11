import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/user/signup", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Signup successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Signup failed");
      });
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
          {/* ================= LEFT SIDE ================= */}

          <Box
            sx={{
              width: "50%",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(145deg, #02224E 0%, #029FFE 100%)",
              color: "#fff",
              p: 5,
            }}
          >
            {/* Decorative circles */}

            <Box
              sx={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.08)",
                top: -100,
                left: -100,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: 250,
                height: 250,
                borderRadius: "50%",
                backgroundColor: "rgba(253,107,2,0.18)",
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
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
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

            <Typography
              variant="h3"
              fontWeight="800"
              textAlign="center"
              sx={{
                position: "relative",
                zIndex: 2,
                fontSize: { md: "38px", lg: "44px" },
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
                color: "rgba(255,255,255,0.85)",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              Join Sellora and discover a simple and reliable marketplace where
              you can buy and sell products easily.
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
              {["Easy Buying", "Easy Selling", "Reliable Deals"].map((item) => (
                <Box
                  key={item}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 5,
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography fontSize="13px" fontWeight="600">
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ================= RIGHT SIDE ================= */}

          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              p: { xs: 3, sm: 5, md: 6 },
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "450px" }}>
              {/* Mobile Logo */}

              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                  mb: 3,
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
                    fontSize: { xs: "28px", sm: "32px" },
                  }}
                >
                  Create Account
                </Typography>

                <Typography
                  sx={{
                    mt: 0.8,
                    color: "#777",
                  }}
                >
                  Create your Sellora account and start buying & selling.
                </Typography>
              </Box>

              {/* Form */}

              <Box component="form" onSubmit={submitHandler}>
                {/* Name */}

                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  margin="normal"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#029FFE",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#029FFE",
                    },
                  }}
                />

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
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#029FFE",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#029FFE",
                    },
                  }}
                />

                {/* Password */}
                <Box sx={{ position: "relative", mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={changeHandler}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "20px",
                      zIndex: 2,
                    }}
                  >
                    {showPassword ? "🙈" : "👀"}
                  </button>
                </Box>

                {/* Phone */}

                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={changeHandler}
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#029FFE",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#029FFE",
                    },
                  }}
                />

                {/* Address */}

                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={changeHandler}
                  margin="normal"
                  multiline
                  rows={2}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#029FFE",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#029FFE",
                    },
                  }}
                />

                {/* Signup Button */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "700",
                    background: "linear-gradient(90deg, #FD6B02, #FD4702)",
                    boxShadow: "0 8px 20px rgba(253,107,2,0.25)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #FD4702, #FD6B02)",
                      boxShadow: "0 10px 25px rgba(253,107,2,0.35)",
                    },
                  }}
                >
                  Create Account
                </Button>
              </Box>

              {/* Login */}

              <Typography textAlign="center" mt={3} sx={{ color: "#777" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#029FFE",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
