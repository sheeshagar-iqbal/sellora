import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get single product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/${id}`
        );

        setProduct(response.data.data || response.data);
      } catch (error) {
        console.log(
          "Product error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  // Product not found
  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight={700}>
            Product not found
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    );
  }

  // Product images
  const images = product?.images || [];

  // Seller
  const seller = product?.seller || {};

  const sellerName = seller?.name || "Sellora User";

  const sellerCity =
    seller?.city || product?.location || "Not available";

  const sellerPhone = seller?.phone || "Not available";

  // Product posted date
  const postDate = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  // Image URL
  const getImageUrl = (image) => {
    return `http://localhost:3000/upload/${image}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f8fa",
        py: { xs: 2, md: 5 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          px: { xs: 2, sm: 3, md: 5 },
        }}
      >
        {/* PAGE TITLE */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            mb: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Product Details
          </Typography>
        </Box>

        {/* ================================================= */}
        {/* MAIN PRODUCT SECTION - FLEX */}
        {/* ================================================= */}

        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",

            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",

            gap: 3,

            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          {/* ================================================= */}
          {/* LEFT SIDE - PRODUCT IMAGE */}
          {/* ================================================= */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "58%",
              },

              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "white",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              {/* MAIN IMAGE */}

              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: "330px",
                    sm: "450px",
                    md: "550px",
                  },

                  backgroundColor: "#f1f2f4",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  overflow: "hidden",
                }}
              >
                {images.length > 0 ? (
                  <Box
                    component="img"
                    src={getImageUrl(images[selectedImage])}
                    alt={product?.title || "Product"}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Typography
                    color="text.secondary"
                    variant="h6"
                  >
                    No Image Available
                  </Typography>
                )}
              </Box>

              {/* THUMBNAILS */}

              {images.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,

                    p: 2,

                    overflowX: "auto",

                    borderTop: "1px solid #eeeeee",
                  }}
                >
                  {images.map((image, index) => (
                    <Box
                      key={`${image}-${index}`}
                      component="img"
                      src={getImageUrl(image)}
                      alt={`Product ${index + 1}`}
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      sx={{
                        width: 80,
                        height: 70,

                        flexShrink: 0,

                        objectFit: "cover",

                        borderRadius: 2,

                        cursor: "pointer",

                        border:
                          selectedImage === index
                            ? "3px solid"
                            : "2px solid #eeeeee",

                        borderColor:
                          selectedImage === index
                            ? "primary.main"
                            : "#eeeeee",

                        transition: "0.2s",

                        "&:hover": {
                          borderColor: "primary.main",
                        },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Card>
          </Box>

          {/* ================================================= */}
          {/* RIGHT SIDE - PRODUCT INFORMATION */}
          {/* ================================================= */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: "42%",
              },

              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",

                borderRadius: 3,

                backgroundColor: "white",

                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent
                sx={{
                  p: {
                    xs: 2.5,
                    sm: 3,
                    md: 4,
                  },
                }}
              >
                {/* CATEGORY */}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{
                    mb: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {product?.category || "Other"}
                </Typography>

                {/* TITLE */}

                <Typography
                  variant="h3"
                  fontWeight={700}
                  sx={{
                    fontSize: {
                      xs: "28px",
                      sm: "32px",
                      md: "38px",
                    },

                    lineHeight: 1.2,

                    mb: 2,
                  }}
                >
                  {product?.title || "Product"}
                </Typography>

                {/* PRICE */}

                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    mb: 3,
                    fontSize: {
                      xs: "28px",
                      md: "34px",
                    },
                  }}
                >
                  ₹
                  {Number(
                    product?.price || 0
                  ).toLocaleString("en-IN")}
                </Typography>

                {/* CONDITION + LOCATION */}

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    flexWrap: "wrap",
                    mb: 3,
                  }}
                >
                  <Chip
                    label={
                      product?.condition || "Used"
                    }
                    sx={{
                      fontWeight: 600,
                    }}
                  />

                  <Chip
                    label={
                      product?.location ||
                      "Location not available"
                    }
                    variant="outlined"
                  />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* DESCRIPTION */}

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    mb: 1.5,
                  }}
                >
                  Description
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                    mb: 4,

                    wordBreak: "break-word",
                  }}
                >
                  {product?.description ||
                    "No description available."}
                </Typography>

                {/* BUTTONS */}

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
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      py: 1.5,

                      borderRadius: 2,

                      fontWeight: 700,

                      textTransform: "none",
                    }}
                    onClick={() => {
                      if (
                        seller?.phone
                      ) {
                        window.location.href = `tel:${seller.phone}`;
                      }
                    }}
                  >
                    Contact Seller
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,

                      py: 1.5,

                      borderRadius: 2,

                      fontWeight: 600,

                      textTransform: "none",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* ================================================= */}
        {/* SELLER INFORMATION - FULL WIDTH */}
        {/* ================================================= */}

        <Card
          sx={{
            width: "100%",
            maxWidth: "1200px",

            mx: "auto",

            mt: 3,

            borderRadius: 3,

            backgroundColor: "white",

            boxShadow:
              "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2.5,
                sm: 3,
                md: 4,
              },
            }}
          >
            {/* SELLER TITLE */}

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                mb: 3,
              }}
            >
              Seller Information
            </Typography>

            {/* SELLER DATA FLEX */}

            <Box
              sx={{
                display: "flex",

                justifyContent: "space-between",

                gap: 3,

                flexWrap: "wrap",
              }}
            >
              {/* SELLER */}

              <Box
                sx={{
                  flex: "1 1 200px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Seller
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {sellerName}
                </Typography>
              </Box>

              {/* LOCATION */}

              <Box
                sx={{
                  flex: "1 1 200px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Location
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {sellerCity}
                </Typography>
              </Box>

              {/* CONTACT */}

              <Box
                sx={{
                  flex: "1 1 200px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Contact
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {sellerPhone}
                </Typography>
              </Box>

              {/* POSTED DATE */}

              <Box
                sx={{
                  flex: "1 1 200px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Posted On
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {postDate}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ProductDetails;