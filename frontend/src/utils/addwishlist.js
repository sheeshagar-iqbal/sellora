import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

 export const addWishlist = async (productId) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/userwishlist/${productId}`,
      {},
      {
        withCredentials: true
      }
    );

    toast.success("Added to wishlist ❤️");

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to add wishlist"
    );
  }
};