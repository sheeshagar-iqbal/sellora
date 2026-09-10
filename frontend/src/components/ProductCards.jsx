import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { addWishlist } from "../utils/addwishlist";
import { UserContext } from "../context/UserContext";


const ProductCards = ({ product }) => {
  const navigate = useNavigate();
  const {getProfile}=useContext(UserContext)
  // console.log(product);
  
  const imageUrl = product?.images?.[0]
    ? `http://localhost:3000/upload/${product.images[0]}`
    : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <Card
      onClick={() => navigate(`/product/${product?._id}`)}
      sx={{
        width: 350,
        // height: 400,
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        border: "1px solid #eeeeee",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 230,
          flexShrink: 0,
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={product?.title || "Product"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* CONDITION */}
        {product?.condition && (
          <Chip
            label={product.condition}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "#fff",
              fontWeight: 600,
              boxShadow: 1,
            }}
          />
        )}

        {/* WISHLIST */}
        <IconButton
          onClick={async(e) => {
             e.stopPropagation();
            await addWishlist(product._id)
            await getProfile()
             
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "#fff",

            "&:hover": {
              backgroundColor: "#f20606",
            },
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* PRICE */}
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{
            mb: 0.5,
            color: "#222",
          }}
        >
          ₹{Number(product?.price || 0).toLocaleString("en-IN")}
        </Typography>

        {/* TITLE */}
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product?.title}
        </Typography>

        {/* CATEGORY + LOCATION */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.category}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            📍 {product?.location}
          </Typography>
        </Box>

        {/* SELLER */}
        <Box
          sx={{
            marginTop: "auto",
            pt: 1.5,
            borderTop: "1px solid #eeeeee",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Seller
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product?.seller?.name || "Unknown Seller"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCards;