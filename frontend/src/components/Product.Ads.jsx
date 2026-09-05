import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductInsert = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "Used",
    location: "",
    images: [],
  });
  const navigate= useNavigate()
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const imageHandler = (e) => {
    setFormData({
      ...formData,
       images: Array.from(e.target.files),
    });
  };

  const data = new FormData();

  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("category", formData.category);
  data.append("condition", formData.condition);
  data.append("location", formData.location);
  formData.images.forEach((image) => {
    data.append("images", image);
  });
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(formData);

    axios
      .post("http://localhost:3000/product", data,{
        withCredentials:true
      })
      .then((res) => {
        console.log(res.data);
        navigate('/')
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f5f7fa",
        py: 5,
      }}
    >
      <Container maxWidth="md">
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
              Post Your Ad
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Sell your product on Sellora
            </Typography>
          </Box>

          <Box component="form" onSubmit={submitHandler}>
            {/* Title */}

            <TextField
              fullWidth
              label="Product Title"
              name="title"
              value={formData.title}
              onChange={changeHandler}
              margin="normal"
              required
              placeholder="e.g. iPhone 15 Pro"
            />

            {/* Description */}

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={changeHandler}
              margin="normal"
              required
              multiline
              rows={5}
              placeholder="Describe your product..."
            />

            {/* Price */}

            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={changeHandler}
              margin="normal"
              required
              placeholder="Enter price"
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />

            {/* Category */}

            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={changeHandler}
              margin="normal"
              required
            >
              <MenuItem value="Mobiles">Mobiles</MenuItem>

              <MenuItem value="Cars">Cars</MenuItem>

              <MenuItem value="Bikes">Bikes</MenuItem>

              <MenuItem value="Electronics">Electronics</MenuItem>

              <MenuItem value="Furniture">Furniture</MenuItem>

              <MenuItem value="Fashion">Fashion</MenuItem>

              <MenuItem value="Properties">Properties</MenuItem>

              <MenuItem value="Jobs">Jobs</MenuItem>

              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            {/* Condition */}

            <TextField
              fullWidth
              select
              label="Condition"
              name="condition"
              value={formData.condition}
              onChange={changeHandler}
              margin="normal"
              required
            >
              <MenuItem value="New">New</MenuItem>

              <MenuItem value="Used">Used</MenuItem>
            </TextField>

            {/* Location */}

            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={changeHandler}
              margin="normal"
              required
              placeholder="e.g. Bhopal, Madhya Pradesh"
            />

            {/* Images */}

            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Product Images
              </Typography>

              <Button
                variant="outlined"
                component="label"
                sx={{
                  textTransform: "none",
                }}
              >
                Choose Images
                <input
                  type="file"
                  hidden
                  multiple
                  name="images"
                  accept="image/*"
                  onChange={imageHandler}
                />
              </Button>

              {formData.images.length > 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {formData.images.length} image(s) selected
                </Typography>
              )}
            </Box>

            {/* Submit */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Post Ad
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductInsert;
