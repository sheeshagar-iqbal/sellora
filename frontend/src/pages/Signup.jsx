import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate =useNavigate()
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/user/signup',formData,{
    withCredentials: true
  })
    .then((res)=>{alert('data inserted')
    console.log(res.data);
    navigate('/login')
    })
    .catch((err)=>console.log(err)    )
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

          <Box textAlign="center" mb={4}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#102A43" }}
            >
              Create Your Account
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Join Sellora and start buying & selling
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
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  textTransform: "none",
                }}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </Button>
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
            />

            {/* City */}

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={changeHandler}
              margin="normal"
            />

            {/* <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Address"
              style={{ width: '100%' }}
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={changeHandler}
              // margin="normal"
            /> */}

            {/* Signup */}

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
              Create Account
            </Button>
          </Box>

          {/* Login */}

          <Typography textAlign="center" mt={3} color="text.secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
