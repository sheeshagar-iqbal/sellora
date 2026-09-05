import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(()=>{
     const getProfile = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3000/user/profile",
              {
                withCredentials: true,
              }
            );
            // console.log(response.data);
            
            setUser(response.data.data || response.data);
          } catch (error) {
            console.log(
              "Profile error:",
              error.response?.data || error.message
            );
          } 
        };
        getProfile()
  },[])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;