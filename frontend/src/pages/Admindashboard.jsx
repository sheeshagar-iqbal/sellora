import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";

// =====================================================
// ICONS
// =====================================================

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";

// =====================================================
// CONTEXT
// =====================================================

import { UserContext } from "../context/UserContext";

// =====================================================
// CHART.JS
// =====================================================

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";

import {
  Line,
  Doughnut,
  Bar,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTooltip,
  Legend,
  Filler
);

// =====================================================
// API
// =====================================================

const API_URL = "http://localhost:3000";

// =====================================================
// COLORS
// =====================================================

const colors = {
  navy: "#02224E",
  orange: "#FD6B02",
  darkOrange: "#FD4702",
  blue: "#029FFE",
  gray: "#E6E6E6",
  background: "#F5F7FB",
  white: "#FFFFFF",
  text: "#1F2937",
  muted: "#6B7280",
  border: "#E5E7EB",
  green: "#16A34A",
  red: "#DC2626",
};

// =====================================================
// COMMON AXIOS CONFIG
// =====================================================

const axiosConfig = {
  withCredentials: true,
};

// =====================================================
// ADMIN DASHBOARD
// =====================================================

const Admindashboard = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [activePage, setActivePage] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  // Dashboard data
  const [dashboardData, setDashboardData] =
    useState(null);

  const [dashboardLoading, setDashboardLoading] =
    useState(false);

  const [dashboardError, setDashboardError] =
    useState("");

  // ===================================================
  // MENU ITEMS
  // ===================================================

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

  // ===================================================
  // PAGE TITLE
  // ===================================================

  const getPageTitle = (page) => {
    const titles = {
      dashboard: "Dashboard",
      users: "Users Management",
      products: "Products Management",
      reports: "Reports",
      settings: "Settings",
    };

    return titles[page] || "Dashboard";
  };

  // ===================================================
  // GET DASHBOARD DATA
  // ===================================================

  const getDashboardData = async () => {
    try {
      setDashboardLoading(true);
      setDashboardError("");

      const response = await axios.get(
        `${API_URL}/admin/dashboard`,
        axiosConfig
      );
      console.log(response.data)
      setDashboardData(response.data);
    } catch (error) {
      console.error(
        "Dashboard API Error:",
        error
      );

      setDashboardError(
        error.response?.data?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setDashboardLoading(false);
    }
  };

  // ===================================================
  // INITIAL DASHBOARD LOAD
  // ===================================================

  useEffect(() => {
    getDashboardData();
  }, []);

  // ===================================================
  // MENU CLICK
  // ===================================================

  const handleMenuClick = (page) => {
    setActivePage(page);
  };

  // ===================================================
  // LOGOUT
  // ===================================================

  const handleLogout = async () => {
    try {
      await axios.get(
        `${API_URL}/user/logout`,
        axiosConfig
      );

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.log(
        "Logout error:",
        error
      );

      setUser(null);

      navigate("/login");
    }
  };

  // ===================================================
  // GO HOME
  // ===================================================

  const goHome = () => {
    navigate("/");
  };

  // ===================================================
  // SIDEBAR WIDTH
  // ===================================================

  const sidebarWidth = sidebarOpen
    ? 250
    : 80;

  // ===================================================
  // MOBILE RESPONSIVE
  // ===================================================

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth <= 768;

  // ===================================================
  // UI
  // ===================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor:
          colors.background,
      }}
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Box
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,

          width: {
            xs: sidebarOpen ? 250 : 0,
            md: sidebarWidth,
          },

          backgroundColor:
            colors.navy,

          color: colors.white,

          display: "flex",
          flexDirection: "column",

          zIndex: 1200,

          transition:
            "width 0.3s ease",

          overflow: "hidden",

          boxShadow:
            "4px 0 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* =================================================
            LOGO HEADER
        ================================================= */}

        <Box
          sx={{
            height: 80,
            minHeight: 80,

            display: "flex",
            alignItems: "center",

            justifyContent:
              sidebarOpen
                ? "space-between"
                : "center",

            px:
              sidebarOpen
                ? 2.5
                : 1,

            cursor: "pointer",

            "&:hover": {
              backgroundColor:
                "rgba(255,255,255,0.05)",
            },
          }}
        >
          {/* LOGO */}

          <Box
            onClick={goHome}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,

                borderRadius: 2,

                backgroundColor:
                  colors.orange,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontWeight: 900,
                fontSize: 20,

                color: "#fff",

                flexShrink: 0,
              }}
            >
              S
            </Box>

            {sidebarOpen && (
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: 1,
                  whiteSpace: "nowrap",
                }}
              >
                SELLORA
              </Typography>
            )}
          </Box>

          {/* COLLAPSE */}

          {sidebarOpen && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();

                setSidebarOpen(false);
              }}
              sx={{
                color: "#fff",

                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.12)",
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        </Box>

        <Divider
          sx={{
            borderColor:
              "rgba(255,255,255,0.12)",
          }}
        />

        {/* =================================================
            EXPAND
        ================================================= */}

        {!sidebarOpen && (
          <Box
            sx={{
              display: "flex",
              justifyContent:
                "center",

              mt: 2,
              mb: 1,
            }}
          >
            <IconButton
              onClick={() =>
                setSidebarOpen(true)
              }
              sx={{
                color: "#fff",

                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.12)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {/* =================================================
            MENU
        ================================================= */}

        <List
          sx={{
            px:
              sidebarOpen
                ? 1.5
                : 1,

            mt: 2,
          }}
        >
          {menuItems.map((item) => (
            <ListItemButton
              key={item.name}
              onClick={() =>
                handleMenuClick(
                  item.name
                )
              }
              selected={
                activePage ===
                item.name
              }
              sx={{
                minHeight: 50,

                justifyContent:
                  sidebarOpen
                    ? "initial"
                    : "center",

                px:
                  sidebarOpen
                    ? 2
                    : 1,

                mb: 1,

                borderRadius: 2,

                color: "#fff",

                "& .MuiListItemIcon-root":
                  {
                    color: "#fff",

                    minWidth:
                      sidebarOpen
                        ? 40
                        : 0,

                    mr:
                      sidebarOpen
                        ? 1
                        : 0,

                    justifyContent:
                      "center",
                  },

                "& .MuiListItemText-root":
                  {
                    display:
                      sidebarOpen
                        ? "block"
                        : "none",
                  },

                "&.Mui-selected":
                  {
                    backgroundColor:
                      colors.orange,
                  },

                "&.Mui-selected:hover":
                  {
                    backgroundColor:
                      colors.darkOrange,
                  },

                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.08)",
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              {sidebarOpen && (
                <ListItemText
                  primary={
                    item.label
                  }
                  primaryTypographyProps={{
                    fontWeight:
                      activePage ===
                      item.name
                        ? 700
                        : 500,
                  }}
                />
              )}
            </ListItemButton>
          ))}
        </List>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <Box
          sx={{
            mt: "auto",
            px:
              sidebarOpen
                ? 1.5
                : 1,
            pb: 1,
          }}
        >
          <ListItemButton
            onClick={goHome}
            sx={{
              minHeight: 50,

              justifyContent:
                sidebarOpen
                  ? "initial"
                  : "center",

              px:
                sidebarOpen
                  ? 2
                  : 1,

              borderRadius: 2,

              color: "#fff",

              "& .MuiListItemIcon-root":
                {
                  color: "#fff",

                  minWidth:
                    sidebarOpen
                      ? 40
                      : 0,

                  mr:
                    sidebarOpen
                      ? 1
                      : 0,

                  justifyContent:
                    "center",
                },

              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.08)",
              },
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>

            {sidebarOpen && (
              <ListItemText
                primary="Back to Website"
              />
            )}
          </ListItemButton>
        </Box>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <Box
          sx={{
            px:
              sidebarOpen
                ? 1.5
                : 1,

            pb: 2,
          }}
        >
          <ListItemButton
            onClick={
              handleLogout
            }
            sx={{
              minHeight: 50,

              justifyContent:
                sidebarOpen
                  ? "initial"
                  : "center",

              px:
                sidebarOpen
                  ? 2
                  : 1,

              borderRadius: 2,

              color: "#fff",

              "& .MuiListItemIcon-root":
                {
                  color: "#fff",

                  minWidth:
                    sidebarOpen
                      ? 40
                      : 0,

                  mr:
                    sidebarOpen
                      ? 1
                      : 0,

                  justifyContent:
                    "center",
                },

              "&:hover": {
                backgroundColor:
                  "rgba(253,71,2,0.3)",
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>

            {sidebarOpen && (
              <ListItemText
                primary="Logout"
              />
            )}
          </ListItemButton>
        </Box>
      </Box>

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <Box
        sx={{
          marginLeft: {
            xs: 0,
            md: `${sidebarWidth}px`,
          },

          width: {
            xs: "100%",
            md: `calc(100% - ${sidebarWidth}px)`,
          },

          minHeight: "100vh",

          display: "flex",
          flexDirection: "column",

          transition:
            "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        {/* =================================================
            TOP BAR
        ================================================= */}

        <Box
          sx={{
            minHeight: 80,

            backgroundColor:
              "#fff",

            borderBottom:
              `1px solid ${colors.border}`,

            display: "flex",
            alignItems: "center",

            justifyContent:
              "space-between",

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            position: "sticky",

            top: 0,

            zIndex: 100,

            boxShadow:
              "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          {/* LEFT */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {!sidebarOpen && (
              <IconButton
                onClick={() =>
                  setSidebarOpen(
                    true
                  )
                }
                sx={{
                  color:
                    colors.navy,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 24,
                  },

                  fontWeight: 800,

                  color:
                    colors.navy,
                }}
              >
                {getPageTitle(
                  activePage
                )}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color:
                    colors.muted,

                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                Welcome back,{" "}
                <strong>
                  {user?.name ||
                    "Admin"}
                </strong>
              </Typography>
            </Box>
          </Box>

          {/* RIGHT */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,

                backgroundColor:
                  colors.orange,

                fontWeight: 700,
              }}
            >
              {user?.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "A"}
            </Avatar>

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Typography
                fontWeight={700}
                sx={{
                  color:
                    colors.navy,
                }}
              >
                {user?.name ||
                  "Admin"}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color:
                    colors.muted,
                }}
              >
                Administrator
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <Box
          sx={{
            flex: 1,

            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            overflowX:
              "hidden",
          }}
        >
          {/* DASHBOARD */}

          {activePage ===
            "dashboard" && (
            <DashboardContent
              data={
                dashboardData
              }
              loading={
                dashboardLoading
              }
              error={
                dashboardError
              }
              refresh={
                getDashboardData
              }
            />
          )}

          {/* USERS */}

          {activePage === "users" && (
            <UsersContent />
          )}

          {/* PRODUCTS */}

          {activePage ===
            "products" && (
            <ProductsContent />
          )}

          {/* REPORTS */}

          {activePage ===
            "reports" && (
            <ReportsContent
              dashboardData={
                dashboardData
              }
            />
          )}

          {/* SETTINGS */}

          {activePage ===
            "settings" && (
            <SettingsContent />
          )}
        </Box>
      </Box>
    </Box>
  );
};

// =====================================================
// DASHBOARD CONTENT
// =====================================================

const DashboardContent = ({
  data,
  loading,
  error,
  refresh,
}) => {
  // ===================================================
  // GET STATS
  // ===================================================

  const stats =
    data?.stats ||
    data?.data?.stats ||
    data?.data ||
    {};

  const totalUsers =
    stats.totalUsers || 0;

  const totalProducts =
    stats.totalProducts || 0;

  const newUsers =
    stats.newUsers ||
    stats.newUsersThisMonth ||

    0;

  const newProducts =
    stats.newProducts ||
    stats.newProductsThisMonth ||
    0;

  const newProductCount =
    stats.newConditionProducts ||
    stats.newProducts ||
    0;

  const usedProductCount =
    stats.usedConditionProducts ||
    stats.usedProducts ||
    0;

  // ===================================================
  // CATEGORY DATA
  // ===================================================

  const categoryStats =
    data?.categoryStats ||
    data?.categories ||
    [];

  const categoryLabels =
    categoryStats.map(
      (item) =>
        item._id ||
        item.category ||
        // item.count ||
        "Unknown"
    );

  const categoryValues =
    categoryStats.map(
      (item) =>
        item.count || 0
    );

  // ===================================================
  // USER GROWTH DATA
  // ===================================================

  const userGrowth =
    stats.userGrowth ||
  data?.userGrowth ||
  data?.data?.userGrowth ||
  [];

const userGrowthLabels = userGrowth.map((item) => {
  if (item.label) {
    return item.label;
  }

  if (item._id?.month) {
    return item._id.month;
  }

  return `${item._id?.month || ""}/${item._id?.year || ""}`;
});

  const userGrowthValues =
  userGrowth.map(
    (item) =>
      item.users || 0
  );

//     console.log(categoryLabels);
// console.log(categoryValues);
  // ===================================================
  // USER CHART
  // ===================================================

  const userChartData = {
    labels:
      userGrowthLabels
        .length > 0
        ? userGrowthLabels
        : ["No Data"],

    datasets: [
      {
        label: "Users",

        data:
          userGrowthValues
            .length > 0
            ? userGrowthValues
            : [0],

        borderColor:
          colors.orange,

        backgroundColor:
          "rgba(253,107,2,0.12)",

        tension: 0.4,

        fill: true,

        pointRadius: 4,

        pointHoverRadius: 6,

        borderWidth: 3,
      },
    ],
  };

  // ===================================================
  // CATEGORY CHART
  // ===================================================

  const chartColors = [
    colors.orange,
    colors.navy,
    colors.blue,
    colors.darkOrange,
    "#B8C0CC",
    "#22C55E",
    "#9333EA",
    "#EAB308",
    "#0891B2",
    "#F43F5E",
  ];

  const categoryData = {
    labels:
      categoryLabels
        .length > 0
        ? categoryLabels
        : ["No Data"],

    datasets: [
      {
        data:
          categoryValues
            .length > 0
            ? categoryValues
            : [1],

        backgroundColor:
          categoryValues
            .length > 0
            ? chartColors.slice(
                0,
                categoryValues.length
              )
            : [
                colors.gray,
              ],

        borderWidth: 0,

        hoverOffset: 8,
      },
    ],
  };

  // ===================================================
  // PRODUCT BAR CHART
  // ===================================================

  const productData = {
    labels:
      categoryLabels
        .length > 0
        ? categoryLabels
        : ["No Data"],

    datasets: [
      {
        label: "Products",

        data:
          categoryValues
            .length > 0
            ? categoryValues
            : [0],

        backgroundColor:
          colors.blue,

        borderRadius: 8,

        barThickness: 35,
      },
    ],
  };

  // ===================================================
  // LINE OPTIONS
  // ===================================================

  const lineOptions = {
    responsive: true,

    maintainAspectRatio:
      false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          precision: 0,
        },

        grid: {
          color:
            "#EEF1F5",
        },
      },
    },
  };

  // ===================================================
  // DOUGHNUT OPTIONS
  // ===================================================

  const doughnutOptions = {
    responsive: true,

    maintainAspectRatio:
      false,

    cutout: "68%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle:
            true,

          padding: 18,

          font: {
            size: 12,
          },
        },
      },
    },
  };

  // ===================================================
  // BAR OPTIONS
  // ===================================================

  const barOptions = {
    responsive: true,

    maintainAspectRatio:
      false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          precision: 0,
        },

        grid: {
          color:
            "#EEF1F5",
        },
      },
    },
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 500,

          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <CircularProgress
            sx={{
              color:
                colors.orange,
            }}
          />

          <Typography
            sx={{
              mt: 2,
              color:
                colors.muted,
            }}
          >
            Loading dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error) {
    return (
      <Box>
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>

        <Button
          variant="contained"
          startIcon={
            <RefreshIcon />
          }
          onClick={refresh}
          sx={{
            backgroundColor:
              colors.orange,

            "&:hover": {
              backgroundColor:
                colors.darkOrange,
            },
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // ===================================================
  // UI
  // ===================================================

  return (
    <Box>
      {/* =================================================
          PAGE INTRO
      ================================================= */}

      <Box
        sx={{
          mb: 3,

          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          justifyContent:
            "space-between",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            color={
              colors.navy
            }
          >
            Overview
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Here's what's
            happening on your
            Sellora marketplace.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            <RefreshIcon />
          }
          onClick={refresh}
          sx={{
            borderColor:
              colors.orange,

            color:
              colors.orange,

            "&:hover": {
              borderColor:
                colors.darkOrange,

              color:
                colors.darkOrange,

              backgroundColor:
                "rgba(253,107,2,0.04)",
            },
          }}
        >
          Refresh
        </Button>
      </Box>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",

          gap: 2.5,

          "@media(max-width:1100px)":
            {
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
            },

          "@media(max-width:600px)":
            {
              gridTemplateColumns:
                "1fr",
            },
        }}
      >
        <StatCard
          title="Total Users"
          value={totalUsers}
          subtitle={`+${newUsers} this month`}
          icon={
            <PeopleIcon />
          }
        />

        <StatCard
          title="Total Products"
          value={
            totalProducts
          }
          subtitle={`+${newProducts} this month`}
          icon={
            <ShoppingBagIcon />
          }
        />

        <StatCard
          title="New Products"
          value={
            newProductCount
          }
          subtitle="Condition: New"
          icon={
            <Inventory2Icon />
          }
        />

        <StatCard
          title="Used Products"
          value={
            usedProductCount
          }
          subtitle="Condition: Used"
          icon={
            <TrendingUpIcon />
          }
        />
      </Box>

      {/* =================================================
          SECOND STAT ROW
      ================================================= */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",

          gap: 2.5,

          mt: 3,

          "@media(max-width:900px)":
            {
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
            },

          "@media(max-width:600px)":
            {
              gridTemplateColumns:
                "1fr",
            },
        }}
      >
        <SimpleInfoCard
          title="Registered Users"
          value={totalUsers}
          description="Total marketplace users"
          icon={
            <PersonAddIcon />
          }
        />

        <SimpleInfoCard
          title="Marketplace Products"
          value={totalProducts}
          description="All listed products"
          icon={
            <CategoryIcon />
          }
        />

        <SimpleInfoCard
          title="Product Categories"
          value={
            categoryLabels.length
          }
          description="Active categories"
          icon={
            <Inventory2Icon />
          }
        />
      </Box>

      {/* =================================================
          CHART ROW
      ================================================= */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "1.6fr 1fr",

          gap: 3,

          mt: 3,

          "@media(max-width:1000px)":
            {
              gridTemplateColumns:
                "1fr",
            },
        }}
      >
        {/* USER GROWTH */}

        <Card
          sx={{
            borderRadius: 3,

            border:
              `1px solid ${colors.border}`,

            boxShadow:
              "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <CardContent
            sx={{
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems:
                  "center",

                justifyContent:
                  "space-between",

                mb: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  color={
                    colors.navy
                  }
                >
                  User Growth
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  New registered
                  users
                </Typography>
              </Box>

              <Chip
                label="Live Data"
                size="small"
                sx={{
                  backgroundColor:
                    "rgba(253,107,2,0.1)",

                  color:
                    colors.orange,

                  fontWeight: 700,
                }}
              />
            </Box>

            <Box
              sx={{
                height: 280,
              }}
            >
              <Line
                data={
                  userChartData
                }
                options={
                  lineOptions
                }
              />
            </Box>
          </CardContent>
        </Card>

        {/* CATEGORY */}

        <Card
          sx={{
            borderRadius: 3,

            border:
              `1px solid ${colors.border}`,

            boxShadow:
              "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <CardContent
            sx={{
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              color={
                colors.navy
              }
            >
              Products by Category
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
              }}
            >
              Marketplace product
              distribution
            </Typography>

            <Box
              sx={{
                height: 280,

                display: "flex",

                justifyContent:
                  "center",
              }}
            >
              <Doughnut
                data={
                  categoryData
                }
                options={
                  doughnutOptions
                }
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* =================================================
          PRODUCT STATISTICS
      ================================================= */}

      <Card
        sx={{
          mt: 3,

          borderRadius: 3,

          border:
            `1px solid ${colors.border}`,

          boxShadow:
            "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent
          sx={{
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={800}
            color={
              colors.navy
            }
          >
            Product Statistics
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
            }}
          >
            Products listed by
            category
          </Typography>

          <Box
            sx={{
              height: 280,
            }}
          >
            <Bar
              data={
                productData
              }
              options={
                barOptions
              }
            />
          </Box>
        </CardContent>
      </Card>

      {/* =================================================
          RECENT DATA
      ================================================= */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: 3,

          mt: 3,

          "@media(max-width:900px)":
            {
              gridTemplateColumns:
                "1fr",
            },
        }}
      >
        <RecentUsers
          users={
            data?.recentUsers ||
            []
          }
        />

        <RecentProducts
          products={
            data?.recentProducts ||
            []
          }
        />
      </Box>
    </Box>
  );
};

// =====================================================
// USERS CONTENT
// =====================================================

const UsersContent = () => {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [deleteUser, setDeleteUser] =
    useState(null);

  // ===================================================
  // GET USERS
  // ===================================================

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await axios.get(
          `${API_URL}/admin/users`,
          axiosConfig
        );

      const responseData =
        response.data;

      const userData =
        responseData.users ||
        responseData.data ||
        [];

      setUsers(userData);
    } catch (error) {
      console.error(
        "Users API Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ===================================================
  // DELETE USER
  // ===================================================

  const handleDeleteUser =
    async () => {
      if (!deleteUser) return;

      try {
        await axios.delete(
          `${API_URL}/admin/users/${deleteUser._id}`,
          axiosConfig
        );

        setUsers((prev) =>
          prev.filter(
            (item) =>
              item._id !==
              deleteUser._id
          )
        );

        setDeleteUser(null);
      } catch (error) {
        console.error(
          "Delete user error:",
          error
        );

        alert(
          error.response?.data
            ?.message ||
            "Unable to delete user."
        );
      }
    };

  // ===================================================
  // SEARCH
  // ===================================================

  const filteredUsers =
    useMemo(() => {
      const value =
        search
          .trim()
          .toLowerCase();

      if (!value) {
        return users;
      }

      return users.filter(
        (item) =>
          item.name
            ?.toLowerCase()
            .includes(value) ||
          item.email
            ?.toLowerCase()
            .includes(value) ||
          item.phone
            ?.toLowerCase()
            .includes(value)
      );
    }, [users, search]);

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <PageLoader text="Loading users..." />
    );
  }

  return (
    <Box>
      {/* HEADER */}

      <Box
        sx={{
          mb: 3,

          display: "flex",

          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          justifyContent:
            "space-between",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            color={
              colors.navy
            }
          >
            Users Management
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Manage all registered
            Sellora users.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            <RefreshIcon />
          }
          onClick={getUsers}
          sx={{
            borderColor:
              colors.orange,

            color:
              colors.orange,
          }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {/* SUMMARY */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, minmax(0,1fr))",

          gap: 3,

          "@media(max-width:800px)":
            {
              gridTemplateColumns:
                "1fr",
            },
        }}
      >
        <SimpleInfoCard
          title="Total Users"
          value={users.length}
          description="Registered users"
          icon={
            <PeopleIcon />
          }
        />

        <SimpleInfoCard
          title="Admin Users"
          value={
            users.filter(
              (item) =>
                item.role ===
                "admin"
            ).length
          }
          description="Administrator accounts"
          icon={
            <SettingsIcon />
          }
        />

        <SimpleInfoCard
          title="Normal Users"
          value={
            users.filter(
              (item) =>
                item.role !==
                "admin"
            ).length
          }
          description="Marketplace users"
          icon={
            <PersonIcon />
          }
        />
      </Box>

      {/* SEARCH */}

      <Card
        sx={{
          mt: 3,

          borderRadius: 3,

          border:
            `1px solid ${colors.border}`,
        }}
      >
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search user by name, email or phone..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>

      {/* TABLE */}

      <Card
        sx={{
          mt: 3,

          borderRadius: 3,

          border:
            `1px solid ${colors.border}`,

          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: 0,
          }}
        >
          <Box
            sx={{
              p: 3,
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              color={
                colors.navy
              }
            >
              Registered Users
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {filteredUsers.length}{" "}
              users found
            </Typography>
          </Box>

          <TableContainer
            sx={{
              overflowX:
                "auto",
            }}
          >
            <Table
              sx={{
                minWidth: 850,
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor:
                      "#F8FAFC",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    User
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Email
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Phone
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Role
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Joined
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUsers.length ===
                0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                    >
                      <Typography
                        sx={{
                          py: 5,
                          color:
                            colors.muted,
                        }}
                      >
                        No users found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(
                    (item) => (
                      <TableRow
                        key={
                          item._id
                        }
                        hover
                      >
                        <TableCell>
                          <Box
                            sx={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 1.5,
                            }}
                          >
                            <Avatar
                              src={
                                item.profileImage
                                  ? `${API_URL}${item.profileImage}`
                                  : ""
                              }
                              sx={{
                                width: 40,
                                height: 40,
                                backgroundColor:
                                  colors.orange,
                              }}
                            >
                              {item.name
                                ?.charAt(
                                  0
                                )
                                .toUpperCase()}
                            </Avatar>

                            <Typography
                              fontWeight={
                                700
                              }
                            >
                              {item.name ||
                                "Unknown"}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          {item.email ||
                            "-"}
                        </TableCell>

                        <TableCell>
                          {item.phone ||
                            "-"}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={
                              item.role ||
                              "user"
                            }
                            size="small"
                            sx={{
                              backgroundColor:
                                item.role ===
                                "admin"
                                  ? "rgba(253,107,2,0.12)"
                                  : "rgba(2,159,254,0.12)",

                              color:
                                item.role ===
                                "admin"
                                  ? colors.orange
                                  : colors.blue,

                              fontWeight: 700,
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          {formatDate(
                            item.createdAt
                          )}
                        </TableCell>

                        <TableCell align="right">
                          {item.role ===
                          "admin" ? (
                            <Tooltip title="Admin account cannot be deleted from here">
                              <span>
                                <IconButton
                                  disabled
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </span>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Delete user">
                              <IconButton
                                onClick={() =>
                                  setDeleteUser(
                                    item
                                  )
                                }
                                sx={{
                                  color:
                                    colors.red,
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* DELETE DIALOG */}

      <ConfirmDialog
        open={
          Boolean(deleteUser)
        }
        title="Delete User"
        message={`Are you sure you want to delete ${
          deleteUser?.name ||
          "this user"
        }?`}
        onClose={() =>
          setDeleteUser(null)
        }
        onConfirm={
          handleDeleteUser
        }
      />
    </Box>
  );
};

// =====================================================
// PRODUCTS CONTENT
// =====================================================

const ProductsContent = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [condition, setCondition] =
    useState("all");

  const [
    deleteProduct,
    setDeleteProduct,
  ] = useState(null);

  // ===================================================
  // GET PRODUCTS
  // ===================================================

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await axios.get(
          `${API_URL}/admin/products`,
          axiosConfig
        );

      const responseData =
        response.data;

      const productData =
        responseData.products ||
        responseData.data ||
        [];

      setProducts(
        productData
      );
    } catch (error) {
      console.error(
        "Products API Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ===================================================
  // DELETE PRODUCT
  // ===================================================

  const handleDeleteProduct =
    async () => {
      if (!deleteProduct) {
        return;
      }

      try {
        await axios.delete(
          `${API_URL}/admin/products/${deleteProduct._id}`,
          axiosConfig
        );

        setProducts((prev) =>
          prev.filter(
            (item) =>
              item._id !==
              deleteProduct._id
          )
        );

        setDeleteProduct(null);
      } catch (error) {
        console.error(
          "Delete product error:",
          error
        );

        alert(
          error.response?.data
            ?.message ||
            "Unable to delete product."
        );
      }
    };

  // ===================================================
  // FILTER
  // ===================================================

  const filteredProducts =
    useMemo(() => {
      const value =
        search
          .trim()
          .toLowerCase();

      return products.filter(
        (item) => {
          const matchesSearch =
            !value ||
            item.title
              ?.toLowerCase()
              .includes(value) ||
            item.category
              ?.toLowerCase()
              .includes(value) ||
            item.location
              ?.toLowerCase()
              .includes(value);

          const matchesCondition =
            condition ===
              "all" ||
            item.condition ===
              condition;

          return (
            matchesSearch &&
            matchesCondition
          );
        }
      );
    }, [
      products,
      search,
      condition,
    ]);

  // ===================================================
  // COUNTS
  // ===================================================

  const newCount =
    products.filter(
      (item) =>
        item.condition ===
        "New"
    ).length;

  const usedCount =
    products.filter(
      (item) =>
        item.condition ===
        "Used"
    ).length;

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <PageLoader text="Loading products..." />
    );
  }

  return (
    <Box>
      {/* HEADER */}

      <Box
        sx={{
          mb: 3,

          display: "flex",

          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          justifyContent:
            "space-between",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            color={
              colors.navy
            }
          >
            Products Management
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Manage all Sellora
            marketplace products.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            <RefreshIcon />
          }
          onClick={
            getProducts
          }
          sx={{
            borderColor:
              colors.orange,

            color:
              colors.orange,
          }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {/* SUMMARY */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, minmax(0,1fr))",

          gap: 3,

          "@media(max-width:800px)":
            {
              gridTemplateColumns:
                "1fr",
            },
        }}
      >
        <SimpleInfoCard
          title="Total Products"
          value={
            products.length
          }
          description="All listed products"
          icon={
            <ShoppingBagIcon />
          }
        />

        <SimpleInfoCard
          title="New Products"
          value={newCount}
          description="Condition: New"
          icon={
            <Inventory2Icon />
          }
        />

        <SimpleInfoCard
          title="Used Products"
          value={usedCount}
          description="Condition: Used"
          icon={
            <CategoryIcon />
          }
        />
      </Box>

      {/* FILTER */}

      <Card
        sx={{
          mt: 3,

          borderRadius: 3,

          border:
            `1px solid ${colors.border}`,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",

              gap: 2,

              flexWrap:
                "wrap",
            }}
          >
            <TextField
              sx={{
                flex: 1,
                minWidth: 240,
              }}
              placeholder="Search product..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl
              sx={{
                minWidth: 180,
              }}
            >
              <InputLabel>
                Condition
              </InputLabel>

              <Select
                value={condition}
                label="Condition"
                onChange={(e) =>
                  setCondition(
                    e.target.value
                  )
                }
              >
                <MenuItem value="all">
                  All
                </MenuItem>

                <MenuItem value="New">
                  New
                </MenuItem>

                <MenuItem value="Used">
                  Used
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* TABLE */}

      <Card
        sx={{
          mt: 3,

          borderRadius: 3,

          border:
            `1px solid ${colors.border}`,

          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: 0,
          }}
        >
          <Box
            sx={{
              p: 3,
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              color={
                colors.navy
              }
            >
              Marketplace Products
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {filteredProducts.length}{" "}
              products found
            </Typography>
          </Box>

          <TableContainer
            sx={{
              overflowX:
                "auto",
            }}
          >
            <Table
              sx={{
                minWidth: 1100,
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor:
                      "#F8FAFC",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Product
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Price
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Category
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Condition
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Location
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Seller
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Date
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 800,
                      color:
                        colors.navy,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProducts.length ===
                0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                    >
                      <Typography
                        sx={{
                          py: 5,
                          color:
                            colors.muted,
                        }}
                      >
                        No products found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map(
                    (product) => {
                      const seller =
                        product.seller;

                      const image =
                        product.images?.[0];

                      return (
                        <TableRow
                          key={
                            product._id
                          }
                          hover
                        >
                          {/* PRODUCT */}

                          <TableCell>
                            <Box
                              sx={{
                                display:
                                  "flex",

                                alignItems:
                                  "center",

                                gap: 1.5,
                              }}
                            >
                              <Box
                                component="img"
                                src={
                                  image
                                    ? `${API_URL}/upload/${image}`
                                    : "/sellora.png"
                                }
                                alt={
                                  product.title
                                }
                                sx={{
                                  width: 55,
                                  height: 55,

                                  borderRadius: 2,

                                  objectFit:
                                    "cover",

                                  border:
                                    `1px solid ${colors.border}`,
                                }}
                              />

                              <Box
                                sx={{
                                  maxWidth: 220,
                                }}
                              >
                                <Typography
                                  fontWeight={
                                    700
                                  }
                                  noWrap
                                >
                                  {product.title ||
                                    "Untitled"}
                                </Typography>

                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  ID:{" "}
                                  {product._id?.slice(
                                    -6
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          {/* PRICE */}

                          <TableCell>
                            <Typography
                              fontWeight={
                                800
                              }
                              color={
                                colors.navy
                              }
                            >
                              ₹
                              {Number(
                                product.price ||
                                  0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </Typography>
                          </TableCell>

                          {/* CATEGORY */}

                          <TableCell>
                            <Chip
                              label={
                                product.category ||
                                "-"
                              }
                              size="small"
                              sx={{
                                backgroundColor:
                                  "rgba(2,159,254,0.1)",

                                color:
                                  colors.blue,

                                fontWeight:
                                  600,
                              }}
                            />
                          </TableCell>

                          {/* CONDITION */}

                          <TableCell>
                            <Chip
                              label={
                                product.condition ||
                                "Used"
                              }
                              size="small"
                              sx={{
                                backgroundColor:
                                  product.condition ===
                                  "New"
                                    ? "rgba(22,163,74,0.1)"
                                    : "rgba(107,114,128,0.1)",

                                color:
                                  product.condition ===
                                  "New"
                                    ? colors.green
                                    : colors.muted,

                                fontWeight:
                                  700,
                              }}
                            />
                          </TableCell>

                          {/* LOCATION */}

                          <TableCell>
                            {product.location ||
                              "-"}
                          </TableCell>

                          {/* SELLER */}

                          <TableCell>
                            <Typography
                              fontWeight={
                                600
                              }
                            >
                              {seller?.name ||
                                "Sellora User"}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {seller?.email ||
                                ""}
                            </Typography>
                          </TableCell>

                          {/* DATE */}

                          <TableCell>
                            {formatDate(
                              product.createdAt
                            )}
                          </TableCell>

                          {/* ACTION */}

                          <TableCell align="right">
                            <Tooltip title="View product">
                              <IconButton
                                onClick={() =>
                                  window.open(
                                    `/product/${product._id}`,
                                    "_blank"
                                  )
                                }
                                sx={{
                                  color:
                                    colors.blue,
                                }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete product">
                              <IconButton
                                onClick={() =>
                                  setDeleteProduct(
                                    product
                                  )
                                }
                                sx={{
                                  color:
                                    colors.red,
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* DELETE */}

      <ConfirmDialog
        open={
          Boolean(deleteProduct)
        }
        title="Delete Product"
        message={`Are you sure you want to delete "${
          deleteProduct?.title ||
          "this product"
        }"?`}
        onClose={() =>
          setDeleteProduct(null)
        }
        onConfirm={
          handleDeleteProduct
        }
      />
    </Box>
  );
};

// =====================================================
// REPORTS
// =====================================================

const ReportsContent = ({
  dashboardData,
}) => {
  const stats =
    dashboardData?.stats ||
    dashboardData?.data?.stats ||
    {};

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={800}
        color={colors.navy}
      >
        Reports
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 0.5,
          mb: 3,
        }}
      >
        Review marketplace
        statistics and reports.
      </Typography>

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, minmax(0,1fr))",

          gap: 3,

          "@media(max-width:800px)":
            {
              gridTemplateColumns:
                "1fr",
            },
        }}
      >
        <SimpleInfoCard
          title="Total Users"
          value={
            stats.totalUsers ||
            0
          }
          description="Registered marketplace users"
          icon={
            <PeopleIcon />
          }
        />

        <SimpleInfoCard
          title="Total Products"
          value={
            stats.totalProducts ||
            0
          }
          description="Marketplace listings"
          icon={
            <ShoppingBagIcon />
          }
        />

        <SimpleInfoCard
          title="Categories"
          value={
            stats.categoryStats
              ?.length ||
            0
          }
          description="Product categories"
          icon={
            <CategoryIcon />
          }
        />
      </Box>

      <Card
        sx={{
          mt: 3,

          borderRadius: 3,

          border:
            `1px solid ${colors.border}`,
        }}
      >
        <CardContent
          sx={{
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems:
                "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,

                borderRadius: 2,

                backgroundColor:
                  "rgba(253,107,2,0.1)",

                color:
                  colors.orange,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >
              <WarningAmberIcon />
            </Box>

            <Box>
              <Typography
                fontWeight={800}
                color={
                  colors.navy
                }
              >
                Report Management
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Actual user/product
                reports require a
                Report model and
                reporting API.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

// =====================================================
// SETTINGS
// =====================================================

const SettingsContent = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={800}
        color={colors.navy}
      >
        Settings
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 0.5,
          mb: 3,
        }}
      >
        Manage your Sellora
        admin settings.
      </Typography>

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns:
            "repeat(2, minmax(0,1fr))",

          gap: 3,

          "@media(max-width:800px)":
            {
              gridTemplateColumns:
                "1fr",
            },
        }}
      >
        <Card
          sx={{
            borderRadius: 3,

            border:
              `1px solid ${colors.border}`,

            boxShadow:
              "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <CardContent
            sx={{
              p: 3,
            }}
          >
            <Typography
              fontWeight={800}
              color={
                colors.navy
              }
            >
              Marketplace Settings
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Configure marketplace
              categories, conditions
              and platform settings.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                mt: 3,

                borderColor:
                  colors.orange,

                color:
                  colors.orange,

                "&:hover": {
                  borderColor:
                    colors.darkOrange,

                  color:
                    colors.darkOrange,
                },
              }}
            >
              Configure
            </Button>
          </CardContent>
        </Card>

        <Card
          sx={{
            borderRadius: 3,

            border:
              `1px solid ${colors.border}`,

            boxShadow:
              "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <CardContent
            sx={{
              p: 3,
            }}
          >
            <Typography
              fontWeight={800}
              color={
                colors.navy
              }
            >
              Admin Settings
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Manage administrator
              preferences and
              dashboard settings.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                mt: 3,

                borderColor:
                  colors.blue,

                color:
                  colors.blue,

                "&:hover": {
                  borderColor:
                    colors.navy,

                  color:
                    colors.navy,
                },
              }}
            >
              Manage
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

// =====================================================
// STAT CARD
// =====================================================

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,

        border:
          `1px solid ${colors.border}`,

        boxShadow:
          "0 4px 20px rgba(0,0,0,0.04)",

        transition:
          "0.25s",

        "&:hover": {
          transform:
            "translateY(-4px)",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap: 2,
          }}
        >
          <Box>
            <Typography
              color={
                colors.muted
              }
              fontSize={14}
              fontWeight={500}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 1,

                fontSize: {
                  xs: 27,
                  sm: 32,
                },

                fontWeight: 800,

                color:
                  colors.navy,
              }}
            >
              {typeof value ===
              "number"
                ? value.toLocaleString(
                    "en-IN"
                  )
                : value}
            </Typography>

            <Typography
              fontSize={13}
              sx={{
                mt: 1,

                color:
                  colors.orange,

                fontWeight: 600,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 52,
              height: 52,

              borderRadius: 2.5,

              backgroundColor:
                "rgba(253,107,2,0.1)",

              color:
                colors.orange,

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// =====================================================
// SIMPLE INFO CARD
// =====================================================

const SimpleInfoCard = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,

        border:
          `1px solid ${colors.border}`,

        boxShadow:
          "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",

            alignItems:
              "flex-start",

            justifyContent:
              "space-between",

            gap: 2,
          }}
        >
          <Box>
            <Typography
              fontSize={14}
              color={
                colors.muted
              }
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 1,

                fontSize: 32,

                fontWeight: 800,

                color:
                  colors.navy,
              }}
            >
              {typeof value ===
              "number"
                ? value.toLocaleString(
                    "en-IN"
                  )
                : value}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              {description}
            </Typography>
          </Box>

          {icon && (
            <Box
              sx={{
                width: 45,
                height: 45,

                borderRadius: 2,

                backgroundColor:
                  "rgba(2,159,254,0.1)",

                color:
                  colors.blue,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

// =====================================================
// RECENT USERS
// =====================================================

const RecentUsers = ({
  users,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,

        border:
          `1px solid ${colors.border}`,
      }}
    >
      <CardContent
        sx={{
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={800}
              color={
                colors.navy
              }
            >
              Recent Users
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Latest registrations
            </Typography>
          </Box>

          <PeopleIcon
            sx={{
              color:
                colors.orange,
            }}
          />
        </Box>

        {users.length === 0 ? (
          <Typography
            color={
              colors.muted
            }
            sx={{
              py: 3,
              textAlign:
                "center",
            }}
          >
            No recent users.
          </Typography>
        ) : (
          users
            .slice(0, 5)
            .map((item) => (
              <Box
                key={
                  item._id
                }
                sx={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap: 1.5,

                  py: 1.5,

                  borderBottom:
                    `1px solid ${colors.border}`,

                  "&:last-child": {
                    borderBottom:
                      "none",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,

                    backgroundColor:
                      colors.orange,
                  }}
                >
                  {item.name
                    ?.charAt(0)
                    .toUpperCase()}
                </Avatar>

                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Typography
                    fontWeight={700}
                    noWrap
                  >
                    {item.name ||
                      "Unknown"}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                  >
                    {item.email ||
                      ""}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  color={
                    colors.muted
                  }
                >
                  {formatDate(
                    item.createdAt
                  )}
                </Typography>
              </Box>
            ))
        )}
      </CardContent>
    </Card>
  );
};

// =====================================================
// RECENT PRODUCTS
// =====================================================

const RecentProducts = ({
  products,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,

        border:
          `1px solid ${colors.border}`,
      }}
    >
      <CardContent
        sx={{
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={800}
              color={
                colors.navy
              }
            >
              Recent Products
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Latest marketplace
              listings
            </Typography>
          </Box>

          <ShoppingBagIcon
            sx={{
              color:
                colors.blue,
            }}
          />
        </Box>

        {products.length ===
        0 ? (
          <Typography
            color={
              colors.muted
            }
            sx={{
              py: 3,
              textAlign:
                "center",
            }}
          >
            No recent products.
          </Typography>
        ) : (
          products
            .slice(0, 5)
            .map((item) => {
              const image =
                item.images?.[0];

              return (
                <Box
                  key={
                    item._id
                  }
                  sx={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    gap: 1.5,

                    py: 1.5,

                    borderBottom:
                      `1px solid ${colors.border}`,

                    "&:last-child": {
                      borderBottom:
                        "none",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={
                      image
                        ? `${API_URL}/upload/${image}`
                        : "/sellora.png"
                    }
                    alt={
                      item.title
                    }
                    sx={{
                      width: 45,
                      height: 45,

                      borderRadius: 2,

                      objectFit:
                        "cover",
                    }}
                  />

                  <Box
                    sx={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      noWrap
                    >
                      {item.title ||
                        "Untitled"}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {item.category ||
                        "Category"}
                    </Typography>
                  </Box>

                  <Typography
                    fontWeight={800}
                    color={
                      colors.navy
                    }
                  >
                    ₹
                    {Number(
                      item.price ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </Typography>
                </Box>
              );
            })
        )}
      </CardContent>
    </Card>
  );
};

// =====================================================
// CONFIRM DIALOG
// =====================================================

const ConfirmDialog = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          color: colors.navy,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography
          color="text.secondary"
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color:
              colors.muted,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={
            <DeleteIcon />
          }
          onClick={onConfirm}
          sx={{
            backgroundColor:
              colors.red,

            "&:hover": {
              backgroundColor:
                "#B91C1C",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// =====================================================
// PAGE LOADER
// =====================================================

const PageLoader = ({
  text = "Loading...",
}) => {
  return (
    <Box
      sx={{
        minHeight: 450,

        display: "flex",

        alignItems:
          "center",

        justifyContent:
          "center",
      }}
    >
      <Box
        sx={{
          textAlign:
            "center",
        }}
      >
        <CircularProgress
          sx={{
            color:
              colors.orange,
          }}
        />

        <Typography
          sx={{
            mt: 2,

            color:
              colors.muted,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

// =====================================================
// DATE FORMAT
// =====================================================

const formatDate = (
  date
) => {
  if (!date) {
    return "-";
  }

  try {
    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  } catch (error) {
    return "-";
  }
};

// =====================================================
// EXPORT
// =====================================================

export default Admindashboard;