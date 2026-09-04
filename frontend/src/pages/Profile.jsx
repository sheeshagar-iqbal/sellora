import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/profile",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.data || response.data);
      } catch (error) {
        console.log(
          "Profile error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  // Logout
  const logoutHandler = async () => {
    try {
      await axios.get(
        "http://localhost:3000/user/logout",
        {
          withCredentials: true,
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(
        "Logout error:",
        error.response?.data || error.message
      );
    }
  };

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
        <Typography variant="h6">
          Loading Profile...
        </Typography>
      </Box>
    );
  }

  if (true) {
  // if (!user) {
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
            Please Login First
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Box>
    );
  }

  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "Not available";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f8fa",
        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          px: {
            xs: 2,
            sm: 3,
            md: 5,
          },
        }}
      >
        {/* MAIN PROFILE CARD */}

        <Card
          sx={{
            width: "100%",
            maxWidth: "900px",
            mx: "auto",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* PROFILE HEADER */}

          <Box
            sx={{
              background:
                "linear-gradient(135deg, #1976d2, #42a5f5)",
              height: {
                xs: 130,
                md: 160,
              },
            }}
          />

          <CardContent
            sx={{
              px: {
                xs: 2.5,
                sm: 4,
                md: 6,
              },
              pb: 5,
            }}
          >
            {/* PROFILE IMAGE */}

            <Box
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                },
                mt: -7,
              }}
            >
              <Avatar
                src={user?.profileImage || ""}
                alt={user?.name || "User"}
                sx={{
                  width: 130,
                  height: 130,
                  fontSize: 45,
                  bgcolor: "primary.main",
                  border: "6px solid white",
                  boxShadow:
                    "0 3px 12px rgba(0,0,0,0.2)",
                }}
              >
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </Avatar>
            </Box>

            {/* NAME + EMAIL */}

            <Box
              sx={{
                mt: 2,
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
              >
                {user?.name || "Sellora User"}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {user?.email || "Email not available"}
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* USER INFORMATION */}

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 3 }}
            >
              Personal Information
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              {/* NAME */}

              <Box
                sx={{
                  flex: "1 1 300px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Full Name
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {user?.name || "Not available"}
                </Typography>
              </Box>

              {/* EMAIL */}

              <Box
                sx={{
                  flex: "1 1 300px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Email
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    wordBreak: "break-word",
                  }}
                >
                  {user?.email || "Not available"}
                </Typography>
              </Box>

              {/* PHONE */}

              <Box
                sx={{
                  flex: "1 1 300px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Phone
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {user?.phone || "Not available"}
                </Typography>
              </Box>

              {/* ADDRESS */}

              <Box
                sx={{
                  flex: "1 1 300px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Address
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {user?.address || "Not available"}
                </Typography>
              </Box>

              {/* ACCOUNT CREATED */}

              <Box
                sx={{
                  flex: "1 1 300px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Member Since
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  {createdDate}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* ACTION BUTTONS */}

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
                onClick={() =>
                  navigate("/edit-profile")
                }
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Edit Profile
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="large"
                fullWidth
                onClick={logoutHandler}
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;