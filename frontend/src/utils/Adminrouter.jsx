import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Adminrouter = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const {setUser}= useContext(UserContext)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });

        // console.log("PROFILE RESPONSE:", res.data);
        setUser(res.data)
        if (res.data) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }

        if (res.data.role !== "admin") {
          return <Navigate to="/" replace />;
        }
      } catch (error) {
        console.log("AUTH ERROR:", error.response?.data || error.message);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Adminrouter;
