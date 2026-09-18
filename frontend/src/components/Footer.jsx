import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Link,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#02224E",
        color: "#fff",
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 6,
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: 5,

            "@media(max-width:900px)": {
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
            },

            "@media(max-width:600px)": {
              gridTemplateColumns: "1fr",
              gap: 3,
            },
          }}
        >
          {/* BRAND */}

          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#fff",
                letterSpacing: 1,
                mb: 2,
              }}
            >
              SELLORA
            </Typography>

            <Typography
              sx={{
                color: "#E6E6E6",
                lineHeight: 1.8,
                maxWidth: 400,
              }}
            >
              Buy, sell and discover products easily with
              Sellora. Find great deals and connect with
              buyers and sellers around you.
            </Typography>

            <Typography
              sx={{
                color: "#FD6B02",
                fontWeight: 700,
                mt: 2,
              }}
            >
              Buy • Sell • Discover
            </Typography>
          </Box>

          {/* QUICK LINKS */}

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>

            <Stack spacing={1.2}>
              <Link
                href="/"
                underline="none"
                sx={{
                  color: "#E6E6E6",
                  "&:hover": {
                    color: "#FD6B02",
                  },
                }}
              >
                Home
              </Link>

              <Link
                href="/productinsert"
                underline="none"
                sx={{
                  color: "#E6E6E6",
                  "&:hover": {
                    color: "#FD6B02",
                  },
                }}
              >
                Sell Product
              </Link>

              <Link
                href="/user/profile"
                underline="none"
                sx={{
                  color: "#E6E6E6",
                  "&:hover": {
                    color: "#FD6B02",
                  },
                }}
              >
                My Profile
              </Link>

              <Link
                href="/login"
                underline="none"
                sx={{
                  color: "#E6E6E6",
                  "&:hover": {
                    color: "#FD6B02",
                  },
                }}
              >
                Login
              </Link>
            </Stack>
          </Box>

          {/* CATEGORIES */}

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Categories
            </Typography>

            <Stack spacing={1.2}>
              <Typography sx={{ color: "#E6E6E6" }}>
                Mobiles
              </Typography>

              <Typography sx={{ color: "#E6E6E6" }}>
                Cars
              </Typography>

              <Typography sx={{ color: "#E6E6E6" }}>
                Bikes
              </Typography>

              <Typography sx={{ color: "#E6E6E6" }}>
                Electronics
              </Typography>

              <Typography sx={{ color: "#E6E6E6" }}>
                Furniture
              </Typography>
            </Stack>
          </Box>

          {/* CONTACT */}

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Contact Us
            </Typography>

            <Stack spacing={1.5}>
              <Typography
                sx={{
                  color: "#E6E6E6",
                  lineHeight: 1.6,
                }}
              >
                Have questions or need help?
                <br />
                We're here to help.
              </Typography>

              <Typography
                sx={{
                  color: "#E6E6E6",
                }}
              >
                Email: support@sellora.com
              </Typography>

              <Typography
                sx={{
                  color: "#E6E6E6",
                }}
              >
                Phone: +91 98765 43210
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* DIVIDER */}

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.15)",
          }}
        />

        {/* BOTTOM */}

        <Box
          sx={{
            minHeight: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,

            "@media(max-width:600px)": {
              flexDirection: "column",
              justifyContent: "center",
              py: 2,
              textAlign: "center",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#E6E6E6",
            }}
          >
            © {new Date().getFullYear()} Sellora. All
            rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={3}
          >
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#E6E6E6",
                fontSize: 14,
                "&:hover": {
                  color: "#FD6B02",
                },
              }}
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              underline="none"
              sx={{
                color: "#E6E6E6",
                fontSize: 14,
                "&:hover": {
                  color: "#FD6B02",
                },
              }}
            >
              Terms & Conditions
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;