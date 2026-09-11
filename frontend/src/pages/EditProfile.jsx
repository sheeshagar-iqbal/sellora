
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // ================= GET PROFILE =================

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/profile",
          {
            withCredentials: true,
          }
        );

        const user = response.data.data || response.data;

        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          address: user?.address || "",
          profileImage: user?.profileImage || "",
        });

        if (user?.profileImage) {
          setPreview(user.profileImage);
        }
      } catch (error) {
        console.log(
          "Profile error:",
          error.response?.data || error.message
        );

        toast.error("Please login first");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  // ================= INPUT CHANGE =================

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGE CHANGE =================

  const imageHandler = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) return;

    setImage(selectedImage);

    const imagePreview = URL.createObjectURL(selectedImage);

    setPreview(imagePreview);
  };

  // ================= UPDATE PROFILE =================

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("address", formData.address);

      if (image) {
        data.append("profileImage", image);
      }
      console.log(data);
      
      const response = await axios.put(
        "http://localhost:3000/user/profile",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      toast.success("Profile updated successfully");

      navigate("/profile");
    } catch (error) {
      console.log(
        "Update profile error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#E6E6E6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "5px solid #E6E6E6",
              borderTop: "5px solid #FD6B02",
              animation:
                "spin 1s linear infinite",
              mx: "auto",
              mb: 2,

              "@keyframes spin": {
                from: {
                  transform: "rotate(0deg)",
                },
                to: {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />

          <Typography
            sx={{
              color: "#02224E",
              fontWeight: 700,
            }}
          >
            Loading Profile...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#E6E6E6",
        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Container maxWidth="md">

        {/* ================= HEADER ================= */}

        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#02224E",
              fontSize: {
                xs: 28,
                sm: 34,
              },
            }}
          >
            Edit Profile
          </Typography>

          <Typography
            sx={{
              color: "#666",
              mt: 1,
            }}
          >
            Update your Sellora account information
          </Typography>
        </Box>

        {/* ================= MAIN CARD ================= */}

        <Card
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            backgroundColor: "#fff",
            border:
              "1px solid #E6E6E6",
            boxShadow:
              "0 15px 45px rgba(2,34,78,0.12)",
          }}
        >

          {/* TOP COLOR HEADER */}

          <Box
            sx={{
              height: 110,
              background:
                "linear-gradient(135deg, #02224E, #029FFE)",
              position: "relative",
              overflow: "hidden",

              "&::before": {
                content: '""',
                position: "absolute",
                width: 180,
                height: 180,
                borderRadius: "50%",
                backgroundColor:
                  "rgba(255,255,255,0.08)",
                top: -100,
                right: -30,
              },

              "&::after": {
                content: '""',
                position: "absolute",
                width: 140,
                height: 140,
                borderRadius: "50%",
                backgroundColor:
                  "rgba(253,107,2,0.25)",
                bottom: -90,
                left: -30,
              },
            }}
          />

          <CardContent
            sx={{
              px: {
                xs: 2,
                sm: 4,
                md: 6,
              },
              pb: 5,
            }}
          >

            {/* ================= PROFILE IMAGE ================= */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: -7,
                position: "relative",
                zIndex: 2,
              }}
            >
              <Avatar
                src={preview || ""}
                sx={{
                  width: 130,
                  height: 130,
                  fontSize: 45,
                  bgcolor: "#FD6B02",
                  border:
                    "6px solid white",
                  boxShadow:
                    "0 8px 25px rgba(2,34,78,0.25)",
                }}
              >
                {formData.name
                  ? formData.name
                      .charAt(0)
                      .toUpperCase()
                  : "U"}
              </Avatar>
            </Box>

            {/* IMAGE BUTTON */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Button
                component="label"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 800,
                  color: "#029FFE",
                  border:
                    "1px solid #029FFE",

                  "&:hover": {
                    backgroundColor:
                      "#EAF7FF",
                  },
                }}
              >
                📷 Change Profile Photo

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                />
              </Button>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* ================= FORM ================= */}

            <Box
              component="form"
              onSubmit={submitHandler}
            >

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: "#02224E",
                  mb: 3,
                }}
              >
                Personal Information
              </Typography>

              {/* FORM FLEX */}

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2.5,
                }}
              >

                {/* NAME */}

                <Box
                  sx={{
                    flex:
                      "1 1 300px",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,

                        "&.Mui-focused fieldset": {
                          borderColor:
                            "#029FFE",
                        },
                      },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color: "#029FFE",
                        },
                    }}
                  />
                </Box>

                {/* EMAIL */}

                <Box
                  sx={{
                    flex:
                      "1 1 300px",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={changeHandler}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,

                        "&.Mui-focused fieldset": {
                          borderColor:
                            "#029FFE",
                        },
                      },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color: "#029FFE",
                        },
                    }}
                  />
                </Box>

                {/* PHONE */}

                <Box
                  sx={{
                    flex:
                      "1 1 300px",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={changeHandler}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,

                        "&.Mui-focused fieldset": {
                          borderColor:
                            "#029FFE",
                        },
                      },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color: "#029FFE",
                        },
                    }}
                  />
                </Box>

                {/* ADDRESS */}

                <Box
                  sx={{
                    flex:
                      "1 1 300px",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={changeHandler}
                    multiline
                    minRows={1}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,

                        "&.Mui-focused fieldset": {
                          borderColor:
                            "#029FFE",
                        },
                      },

                      "& .MuiInputLabel-root.Mui-focused":
                        {
                          color: "#029FFE",
                        },
                    }}
                  />
                </Box>

              </Box>

              {/* ================= BUTTONS ================= */}

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >

                {/* SAVE */}

                <Button
                  type="submit"
                  fullWidth
                  disabled={saving}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 900,
                    fontSize: 16,
                    textTransform: "none",
                    color: "#fff",

                    background:
                      "linear-gradient(135deg, #FD6B02, #FD4702)",

                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #FD4702, #FD6B02)",
                      transform:
                        "translateY(-2px)",
                      boxShadow:
                        "0 8px 20px rgba(253,107,2,0.25)",
                    },

                    transition: "0.25s",
                  }}
                >
                  {saving
                    ? "Saving..."
                    : "💾 Save Changes"}
                </Button>

                {/* CANCEL */}

                <Button
                  type="button"
                  fullWidth
                  onClick={() =>
                    navigate("/userprofile")
                  }
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 900,
                    fontSize: 16,
                    textTransform: "none",
                    color: "#02224E",
                    border:
                      "2px solid #02224E",

                    "&:hover": {
                      backgroundColor:
                        "#02224E",
                      color: "#fff",
                      transform:
                        "translateY(-2px)",
                    },

                    transition: "0.25s",
                  }}
                >
                  ← Cancel
                </Button>

              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EditProfile;

