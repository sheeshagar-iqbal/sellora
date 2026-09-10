
import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "Used",
    location: "",
    images: [],
  });

  // New images selected by user
  const [newImages, setNewImages] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

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
    setNewImages(Array.from(e.target.files));
  };

  // =========================
  // GET PRODUCT
  // =========================
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/${id}`
        );

        const product =
          response.data.data || response.data;

        setFormData({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          condition: product.condition || "Used",
          location: product.location || "",
          images: product.images || [],
        });

        console.log("Product:", product);
      } catch (error) {
        console.log(
          "Product error:",
          error.response?.data || error.message
        );

        toast.error(
          error.response?.data?.message ||
            "Unable to load product"
        );
      }
    };

    getProduct();
  }, [id]);

  // =========================
  // SUBMIT UPDATE
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

    // Only newly selected images
    newImages.forEach((image) => {
      data.append("images", image);
    });

    try {
      const res = await axios.put(
        `http://localhost:3000/product/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

      toast.success(
        res.data?.message ||
          "Product updated successfully"
      );

      navigate("/userprofile");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update product"
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
              Update Your Ad
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                opacity: 0.85,
              }}
            >
              Update your product information on Sellora
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

              {/* =====================================
                  LEFT COLUMN
              ====================================== */}
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

                {/* TITLE */}
                <TextField
                  fullWidth
                  label="Product Title"
                  name="title"
                  value={formData.title}
                  onChange={changeHandler}
                  margin="normal"
                  required
                  placeholder="e.g. iPhone 15 Pro"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },

                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                />

                {/* DESCRIPTION */}
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={changeHandler}
                  margin="normal"
                  required
                  multiline
                  rows={7}
                  placeholder="Describe your product..."
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },

                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                />

                {/* PRICE */}
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

              {/* =====================================
                  RIGHT COLUMN
              ====================================== */}
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

                {/* CATEGORY */}
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={changeHandler}
                  margin="normal"
                  required
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

                {/* CONDITION */}
                <TextField
                  fullWidth
                  select
                  label="Condition"
                  name="condition"
                  value={formData.condition}
                  onChange={changeHandler}
                  margin="normal"
                  required
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

                {/* LOCATION */}
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={changeHandler}
                  margin="normal"
                  required
                  placeholder="e.g. Bhopal, Madhya Pradesh"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: colors.orange,
                    },

                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.orange,
                    },
                  }}
                />

                {/* =========================
                    EXISTING IMAGES
                ========================== */}
                {formData.images.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      fontWeight={700}
                      sx={{
                        color: colors.blue,
                        mb: 1,
                      }}
                    >
                      Current Images
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        flexWrap: "wrap",
                      }}
                    >
                      {formData.images.map(
                        (image, index) => (
                          <Box
                            key={index}
                            component="img"
                            src={`http://localhost:3000/upload/${image}`}
                            alt={`Product ${index + 1}`}
                            sx={{
                              width: 80,
                              height: 80,
                              objectFit: "cover",
                              borderRadius: 2,
                              border: `1px solid ${colors.gray}`,
                            }}
                          />
                        )
                      )}
                    </Box>
                  </Box>
                )}

                {/* =========================
                    NEW IMAGES
                ========================== */}
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
                    Update Product Images
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                  >
                    Choose new images if you want to
                    update your product photos.
                  </Typography>

                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,

                      color: colors.orangeDark,

                      borderColor: colors.orange,

                      "&:hover": {
                        borderColor:
                          colors.orangeDark,

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

                  {newImages.length > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1.5,
                        color: colors.blue,
                        fontWeight: 600,
                      }}
                    >
                      {newImages.length} new image(s)
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
                UPDATE BUTTON
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
                  backgroundColor:
                    colors.orangeDark,
                },
              }}
            >
              Update Ad
            </Button>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductUpdate;

