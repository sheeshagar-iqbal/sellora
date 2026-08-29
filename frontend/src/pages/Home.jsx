import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";

import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import ProductCards from "../components/ProductCards";

const products = [
  {
    id: 1,
    title: "iPhone 15",
    price: "55000",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
  },
  {
    id: 2,
    title: "Royal Enfield Classic",
    price: "120000",
    location: "Bhopal",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
  },
  {
    id: 3,
    title: "HP Laptop",
    price: "45000",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
  {
    id: 4,
    title: "Modern Sofa",
    price: "18000",
    location: "Indore",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  },
];

const Home = () => {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background:
            "linear-gradient(135deg, #eef7ff 0%, #f5fff2 100%)",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ color: "#102A43" }}
        >
          Find What You Need
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mt: 1, mb: 4 }}
        >
          Buy • Sell • Discover
        </Typography>

        <SearchBar />
      </Box>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Categories */}
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Browse Categories
        </Typography>

        <Category />

        {/* Products */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={6}
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            Fresh Recommendations
          </Typography>

          <Button>
            View All
          </Button>
        </Box>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCards product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;