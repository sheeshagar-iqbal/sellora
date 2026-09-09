import { toast } from "react-toastify";
import axios from "axios";

export const addToCart = async (productId) => {
  try {
    console.log("Product ID:", productId);

    const res = await axios.post(
      `http://localhost:3000/addcard/${productId}`,
      {},
      {
        withCredentials: true,
      }
    );

    toast.success(res.data.message);

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Unable to add to cart"
    );
  }
};