import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
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

  if (loading) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h5">
          Product not found
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Container>
    );
  }

  const images = product?.images || [];
  const seller = product?.seller || {};

  const sellerName = seller?.name || "Sellora User";
  const sellerCity =
    seller?.city || product?.location || "Not available";
  const sellerPhone = seller?.phone || "Not available";

  const postDate = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  return (
    <Box
      sx={{
        backgroundColor: "#6535e012",
        minHeight: "100vh",
        py: { xs: 2, md: 5 },
      }}
    >
      <Container maxWidth="xl">

        {/* PAGE TITLE */}

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mb: 3,
            px: 1,
          }}
        >
          Product Details
        </Typography>


        {/* =========================================
            MAIN PRODUCT SECTION
        ========================================= */}

        <Grid container spacing={3}>

          {/* ================= IMAGE SECTION ================= */}

          <Grid item xs={12} md={7}>

            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "white",
                display:fl
              }}
            >

              {/* MAIN IMAGE */}

              <Box
                sx={{
                  height: {
                    xs: 330,
                    sm: 450,
                    md: 560,
                  },
                  width: {
                    xs: 330,
                    sm: 550,
                    md: 660,
                    lg:760
                  },
                  backgroundColor: "#185ce4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {images.length > 0 ? (
                  <Box
                    component="img"
                    src={`http://localhost:3000/upload/${images[selectedImage]}`}
                    alt={product.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Typography color="text.secondary">
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
                    borderTop: "1px solid #eee",
                  }}
                >
                  {images.map((image, index) => (
                    <Box
                      key={`${image}-${index}`}
                      component="img"
                      src={`http://localhost:3000/upload/${image}`}
                      alt={`Product ${index + 1}`}
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      sx={{
                        width: 75,
                        height: 65,
                        objectFit: "cover",
                        borderRadius: 2,
                        cursor: "pointer",

                        border:
                          selectedImage === index
                            ? "3px solid"
                            : "2px solid #eee",

                        borderColor:
                          selectedImage === index
                            ? "primary.main"
                            : "#eee",

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
          </Grid>


          {/* ================= PRODUCT INFO ================= */}

          <Grid item xs={12} md={5}>

            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                backgroundColor: "white",
              }}
            >

              <CardContent
                sx={{
                  p: {
                    xs: 2.5,
                    md: 4,
                  },
                }}
              >

                {/* CATEGORY */}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                  sx={{ mb: 1 }}
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
                    mb: 2.5,
                  }}
                >
                  ₹
                  {Number(product?.price || 0).toLocaleString(
                    "en-IN"
                  )}
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
                    label={product?.condition || "Used"}
                    sx={{
                      fontWeight: 600,
                    }}
                  />

                  <Chip
                    label={product?.location || "Location"}
                    variant="outlined"
                  />

                </Box>


                <Divider sx={{ mb: 3 }} />


                {/* DESCRIPTION */}

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ mb: 1.5 }}
                >
                  Description
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                    mb: 4,
                  }}
                >
                  {product?.description ||
                    "No description available."}
                </Typography>


                {/* ACTION BUTTONS */}

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
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
                    }}
                  >
                    Contact Seller
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      borderRadius: 2,
                    }}
                  >
                    Save
                  </Button>

                </Box>

              </CardContent>
            </Card>

          </Grid>
        </Grid>


        {/* =========================================
            SELLER INFORMATION - FULL WIDTH
        ========================================= */}

        <Card
          sx={{
            mt: 3,
            borderRadius: 3,
            backgroundColor: "white",
          }}
        >

          <CardContent
            sx={{
              p: {
                xs: 2.5,
                md: 4,
              },
            }}
          >

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 3 }}
            >
              Seller Information
            </Typography>


            <Grid container spacing={3}>

              {/* SELLER */}

              <Grid item xs={12} sm={6} md={3}>

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

              </Grid>


              {/* LOCATION */}

              <Grid item xs={12} sm={6} md={3}>

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

              </Grid>


              {/* PHONE */}

              <Grid item xs={12} sm={6} md={3}>

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

              </Grid>


              {/* POST DATE */}

              <Grid item xs={12} sm={6} md={3}>

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

              </Grid>

            </Grid>

          </CardContent>
        </Card>

      </Container>
    </Box>
  );
};

export default ProductDetails;