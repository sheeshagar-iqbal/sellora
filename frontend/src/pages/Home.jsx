import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

import axios from "axios";

import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import ProductCards from "../components/ProductCards";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });

  // ================= GET PRODUCTS =================

  const getProducts = async (search = "", category = "") => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/product",
        {
          params: {
            search: search.trim(),
            category,
          },
        }
      );

      console.log("PRODUCTS:", response.data);

      setProducts(response.data.products || []);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    getProducts();
  }, []);

  // ================= SEARCH =================

  const handleSearch = (searchValue) => {
    const search = searchValue.trim();

    setFilters({
      search,
      category: "",
    });

    // Empty search = all products
    getProducts(search, "");
  };

  // ================= CATEGORY =================

  const handleCategory = (categoryValue) => {
    // ALL = show all products
    if (categoryValue === "ALL") {
      setFilters({
        search: "",
        category: "",
      });

      getProducts("", "");
      return;
    }

    setFilters({
      search: "",
      category: categoryValue,
    });

    getProducts("", categoryValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E6E6E6",
        py: 4,
      }}
    >
      <Container maxWidth="xl">

        {/* ================= SEARCH ================= */}

        <SearchBar
          onSearch={handleSearch}
          currentSearch={filters.search}
        />

        {/* ================= CATEGORY ================= */}

        <Category
          onCategorySelect={handleCategory}
          selectedCategory={filters.category}
        />

        {/* ================= PRODUCTS HEADER ================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#02224E",
              }}
            >
              {filters.category
                ? `${filters.category} Products`
                : filters.search
                ? `Search results for "${filters.search}"`
                : "Latest Products"}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mt: 0.5,
              }}
            >
              Find the best products on Sellora
            </Typography>
          </Box>

          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: 3,
              backgroundColor: "#fff",
              border: "1px solid #E6E6E6",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "#FD6B02",
              }}
            >
              {products.length} Products
            </Typography>
          </Box>
        </Box>

        {/* ================= LOADING ================= */}

        {loading && (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress
                sx={{
                  color: "#FD6B02",
                }}
              />

              <Typography
                sx={{
                  mt: 2,
                  color: "#02224E",
                  fontWeight: 600,
                }}
              >
                Finding products...
              </Typography>
            </Box>
          </Box>
        )}

        {/* ================= PRODUCTS ================= */}

        {!loading && products.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: {
                xs: "center",
                sm: "flex-start",
              },
            }}
          >
            {products.map((product) => (
              <Box
                key={product._id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 12px)",
                    md: "calc(33.333% - 16px)",
                    lg: "calc(25% - 18px)",
                  },
                  minWidth: 0,
                }}
              >
                <ProductCards
                  product={product}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* ================= NO PRODUCTS ================= */}

        {!loading && products.length === 0 && (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#fff",
              borderRadius: 4,
              border: "1px solid #E6E6E6",
              px: 3,
              py: 6,
            }}
          >
            <Typography
              sx={{
                fontSize: 55,
                mb: 1,
              }}
            >
              🔍
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#02224E",
              }}
            >
              No products found
            </Typography>

            <Typography
              sx={{
                color: "#777",
                mt: 1,
              }}
            >
              Try another search or select a different category.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;