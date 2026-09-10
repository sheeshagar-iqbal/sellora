
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const navigate = useNavigate();

  // =========================
  // COLORS
  // =========================
  const colors = {
    orange: "#FD6B02",
    orangeDark: "#FD4702",
    blue: "#02224E",
    gray: "#E6E6E6",
  };

  // =========================
  // CHANGE HANDLER
  // =========================
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // IMAGE HANDLER
  // =========================
  const imageHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const submitHandler = async (e) => {
    e.preventDefault();

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

    try {
      const res = await axios.post(
        "http://localhost:3000/product",
        data,
        {
          withCredentials: true,
        }
      );

      toast.success(
        res.data?.message || "Product added successfully"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to add product"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.gray,
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="lg">

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: `1px solid ${colors.gray}`,
          }}
        >
          {/* =========================
              HEADER
          ========================== */}
          <Box
            sx={{
              backgroundColor: colors.blue,
              color: "#fff",
              px: { xs: 3, md: 5 },
              py: 3,
            }}
          >
            <Typography
              variant="h4"
              fontWeight={800}
            >
              Post Your Ad
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                opacity: 0.85,
              }}
            >
              Sell your product on Sellora
            </Typography>
          </Box>

          {/* =========================
              FORM
          ========================== */}
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{
              p: { xs: 2.5, sm: 4, md: 5 },
              backgroundColor: "#fff",
            }}
          >

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                gap: { xs: 3, md: 5 },
              }}
            >

              {/* =================================================
                  LEFT COLUMN
              ================================================== */}
              <Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    color: colors.blue,
                    mb: 2,
                  }}
                >
                  Product Information
                </Typography>

                {/* Title */}
                <TextField
                  fullWidth
                  label="Product Title"
                  name="title"
                  value={formData.title}
                  onChange={changeHandler}
                  required
                  placeholder="e.g. iPhone 15 Pro"
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                />

                {/* Description */}
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={changeHandler}
                  required
                  multiline
                  rows={7}
                  placeholder="Describe your product..."
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                />

                {/* Price */}
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={changeHandler}
                  required
                  placeholder="Enter price"
                  margin="normal"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                />

              </Box>

              {/* =================================================
                  RIGHT COLUMN
              ================================================== */}
              <Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    color: colors.blue,
                    mb: 2,
                  }}
                >
                  Product Details
                </Typography>

                {/* Category */}
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={changeHandler}
                  required
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                >
                  <MenuItem value="Mobiles">
                    Mobiles
                  </MenuItem>

                  <MenuItem value="Cars">
                    Cars
                  </MenuItem>

                  <MenuItem value="Bikes">
                    Bikes
                  </MenuItem>

                  <MenuItem value="Electronics">
                    Electronics
                  </MenuItem>

                  <MenuItem value="Furniture">
                    Furniture
                  </MenuItem>

                  <MenuItem value="Fashion">
                    Fashion
                  </MenuItem>

                  <MenuItem value="Properties">
                    Properties
                  </MenuItem>

                  <MenuItem value="Jobs">
                    Jobs
                  </MenuItem>

                  <MenuItem value="Other">
                    Other
                  </MenuItem>
                </TextField>

                {/* Condition */}
                <TextField
                  fullWidth
                  select
                  label="Condition"
                  name="condition"
                  value={formData.condition}
                  onChange={changeHandler}
                  required
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                >
                  <MenuItem value="New">
                    New
                  </MenuItem>

                  <MenuItem value="Used">
                    Used
                  </MenuItem>
                </TextField>

                {/* Location */}
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={changeHandler}
                  required
                  placeholder="e.g. Bhopal, Madhya Pradesh"
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                />

                {/* Images */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2.5,
                    borderRadius: 2,
                    border: `2px dashed ${colors.gray}`,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Typography
                    fontWeight={700}
                    sx={{
                      color: colors.blue,
                      mb: 1,
                    }}
                  >
                    Product Images
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                  >
                    Upload clear images of your product
                  </Typography>

                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      color: colors.orangeDark,
                      borderColor: colors.orange,
                      textTransform: "none",
                      fontWeight: 700,

                      "&:hover": {
                        borderColor: colors.orangeDark,
                        backgroundColor:
                          "rgba(253,107,2,0.06)",
                      },
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
                      sx={{
                        mt: 1.5,
                        color: colors.blue,
                        fontWeight: 600,
                      }}
                    >
                      {formData.images.length} image(s)
                      selected
                    </Typography>
                  )}
                </Box>

              </Box>
            </Box>

            {/* =========================
                DIVIDER
            ========================== */}
            <Divider
              sx={{
                my: 4,
                borderColor: colors.gray,
              }}
            />

            {/* =========================
                SUBMIT BUTTON
            ========================== */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.6,
                borderRadius: 2,

                textTransform: "none",
                fontSize: "17px",
                fontWeight: 800,

                backgroundColor: colors.orange,

                "&:hover": {
                  backgroundColor: colors.orangeDark,
                },
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

