
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()
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
    const res= await axios.post('http://localhost:3000/user/login',formData,{
    withCredentials: true
  })
     console.log(res.data);
      alert("Login successful");

     navigate('/')
   
    // console.log(formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f4f8ff, #f5fff7)",
        py: 5,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
          }}
        >
          {/* Heading */}

          <Box sx={{ textAlign: "center" }} mb={4}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#102A43",
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Login to your Sellora account
            </Typography>
          </Box>

          {/* Login Form */}

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
            />

            {/* Password */}

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={changeHandler}
              margin="normal"
              required
              placeholder="Enter your password"
            />

            {/* Show Password */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 0.5,
              }}
            >
              <Button
                type="button"
                size="small"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                sx={{
                  textTransform: "none",
                }}
              >
                {showPassword
                  ? "Hide Password"
                  : "Show Password"}
              </Button>
            </Box>

            {/* Login Button */}

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
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Box>

          {/* Signup */}

          <Typography
            textAlign="center"
            mt={3}
            color="text.secondary"
          >
            Don't have an account?{" "}

            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

