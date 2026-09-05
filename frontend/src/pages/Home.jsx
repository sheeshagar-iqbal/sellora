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
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


const Home = () => {
  // const [userdata,setUserdata]=useState()
  const [products,setProducts]=useState([])
 
  
  useEffect(()=>{
 
   
   axios.get('http://localhost:3000/product')
   .then(res=>setProducts(res.data))
   .catch(err=>console.log(err)   )
  },[])

  return (
    

    <>
     
     <div>
      
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
            <Grid item xs={12} sm={6} md={3} lg={4} key={product.id}>
              <ProductCards key={product._id} product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
       </div> 
    </>
  );
};

export default Home;