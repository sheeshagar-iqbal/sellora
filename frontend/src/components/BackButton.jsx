import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      onClick={() => navigate(-1)}
      sx={{
        mb: 2,
        color: "#02224E",
        textTransform: "none",
        fontWeight: 600,
        padding: 0,
        minWidth: "auto",
        "&:hover": {
          backgroundColor: "transparent",
          color: "#FD6B02"
        }
      }}
    >
      ← Back
    </Button>
  );
};

export default BackButton;