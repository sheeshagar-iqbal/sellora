import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Admindashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "users",
      label: "Users",
      icon: <PeopleIcon />,
    },
    {
      name: "products",
      label: "Products",
      icon: <Inventory2Icon />,
    },
    {
      name: "reports",
      label: "Reports",
      icon: <ReportIcon />,
    },
    {
      name: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  const handleMenuClick = (page) => {
    setActivePage(page);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        backgroundColor: "#f5f7fb",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <Box
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: "#02224E",
          color: "#fff",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}

        <Box
          sx={{
            height: 80,
            display: "flex",
            alignItems: "center",
            px: 3,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 27,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            SELLORA
          </Typography>
        </Box>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.12)",
          }}
        />

        {/* MENU */}

        <List
          sx={{
            px: 1.5,
            mt: 2,
          }}
        >
          {menuItems.map((item) => (
            <ListItemButton
              key={item.name}
              onClick={() => handleMenuClick(item.name)}
              selected={activePage === item.name}
              sx={{
                borderRadius: 2,
                mb: 1,
                color: "#fff",

                "& .MuiListItemIcon-root": {
                  color: "#fff",
                  minWidth: 40,
                },

                "&.Mui-selected": {
                  backgroundColor: "#FD6B02",
                  color: "#fff",
                },

                "&.Mui-selected .MuiListItemIcon-root": {
                  color: "#fff",
                },

                "&.Mui-selected:hover": {
                  backgroundColor: "#FD4702",
                },

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        {/* BOTTOM */}

        <Box
          sx={{
            mt: "auto",
            p: 1.5,
          }}
        >
          <ListItemButton
            onClick={() => alert("Logout clicked")}
            sx={{
              color: "#fff",
              borderRadius: 2,

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },

              "& .MuiListItemIcon-root": {
                color: "#fff",
                minWidth: 40,
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </Box>

      {/* ================= MAIN AREA ================= */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* TOP BAR */}

        <Box
          sx={{
            height: 80,
            minHeight: 80,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            borderBottom: "1px solid #eee",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="#02224E"
            >
              {getPageTitle(activePage)}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Welcome back, Admin
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#FD6B02",
              }}
            >
              A
            </Avatar>

            <Box>
              <Typography fontWeight={600}>
                Admin
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Administrator
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* CONTENT */}

        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            p: 4,
          }}
        >
          {activePage === "dashboard" && <DashboardContent />}

          {activePage === "users" && <UsersContent />}

          {activePage === "products" && <ProductsContent />}

          {activePage === "reports" && <ReportsContent />}

          {activePage === "settings" && <SettingsContent />}
        </Box>
      </Box>
    </Box>
  );
};

/* ================================================= */
/* PAGE TITLE */
/* ================================================= */

const getPageTitle = (page) => {
  const titles = {
    dashboard: "Dashboard",
    users: "Users",
    products: "Products",
    reports: "Reports",
    settings: "Settings",
  };

  return titles[page];
};

/* ================================================= */
/* DASHBOARD */
/* ================================================= */

const DashboardContent = () => {
  const userChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
    ],

    datasets: [
      {
        label: "Users",

        data: [
          20,
          35,
          45,
          60,
          72,
          95,
          125,
        ],

        borderColor: "#FD6B02",

        backgroundColor:
          "rgba(253,107,2,0.15)",

        tension: 0.4,

        fill: true,

        pointRadius: 4,
      },
    ],
  };

  const categoryData = {
    labels: [
      "Mobiles",
      "Cars",
      "Bikes",
      "Electronics",
      "Furniture",
    ],

    datasets: [
      {
        data: [80, 45, 60, 95, 40],

        backgroundColor: [
          "#FD6B02",
          "#02224E",
          "#029FFE",
          "#FD4702",
          "#E6E6E6",
        ],

        borderWidth: 0,
      },
    ],
  };

  const productData = {
    labels: [
      "Mobiles",
      "Cars",
      "Bikes",
      "Electronics",
      "Furniture",
    ],

    datasets: [
      {
        label: "Products",

        data: [80, 45, 60, 95, 40],

        backgroundColor: "#029FFE",

        borderRadius: 6,
      },
    ],
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* STATS */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",

          gap: 2.5,

          "@media(max-width:1100px)": {
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
          },

          "@media(max-width:600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <StatCard
          title="Total Users"
          value="125"
          subtitle="+12% this month"
        />

        <StatCard
          title="Total Products"
          value="348"
          subtitle="+18% this month"
        />

        <StatCard
          title="Total Sales"
          value="₹2.4L"
          subtitle="+24% this month"
        />

        <StatCard
          title="Reports"
          value="12"
          subtitle="5 pending"
        />
      </Box>

      {/* CHARTS */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 3,
          mt: 3,

          "@media(max-width:900px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        {/* LINE */}

        <Card
          sx={{
            borderRadius: 3,
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#02224E"
              mb={2}
            >
              User Growth
            </Typography>

            <Box
              sx={{
                height: 250,
              }}
            >
              <Line
                data={userChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,

                  plugins: {
                    legend: {
                      display: false,
                    },
                  },

                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* DOUGHNUT */}

        <Card
          sx={{
            borderRadius: 3,
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#02224E"
              mb={2}
            >
              Products by Category
            </Typography>

            <Box
              sx={{
                height: 250,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Doughnut
                data={categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* BAR */}

      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            color="#02224E"
            mb={2}
          >
            Product Statistics
          </Typography>

          <Box
            sx={{
              height: 220,
            }}
          >
            <Bar
              data={productData}
              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    display: false,
                  },
                },

                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

/* ================================================= */
/* USERS */
/* ================================================= */

const UsersContent = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        color="#02224E"
        mb={3}
      >
        Users Management
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography>
            Total registered users: 125
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Here you can manage all Sellora users.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

/* ================================================= */
/* PRODUCTS */
/* ================================================= */

const ProductsContent = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        color="#02224E"
        mb={3}
      >
        Products Management
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography>
            Total products: 348
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Here you can manage all marketplace products.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

/* ================================================= */
/* REPORTS */
/* ================================================= */

const ReportsContent = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        color="#02224E"
        mb={3}
      >
        Reports
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography>
            Total reports: 12
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            5 reports are currently pending.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

/* ================================================= */
/* SETTINGS */
/* ================================================= */

const SettingsContent = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        color="#02224E"
        mb={3}
      >
        Settings
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography>
            Admin settings
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Manage dashboard and marketplace settings.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

/* ================================================= */
/* STAT CARD */
/* ================================================= */

const StatCard = ({
  title,
  value,
  subtitle,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Typography
          color="text.secondary"
          fontSize={14}
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight={800}
          color="#02224E"
          sx={{ mt: 1 }}
        >
          {value}
        </Typography>

        <Typography
          fontSize={13}
          sx={{
            mt: 1,
            color: "#FD6B02",
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Admindashboard;