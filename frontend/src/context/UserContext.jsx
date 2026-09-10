import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const getProfile = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3000/user/profile",
              {
                withCredentials: true,
              }
            );
            // console.log(response.data);
            if(response?.data){
            setUser(response.data.data || response.data);
                  
            }else{
              setUser(null)
            }
            
          } catch (error) {
            console.log(
              "Profile error:",
              error.response?.data || error.message
            );
          } 
        };
  useEffect(()=>{
     
        getProfile()
  },[])
  return (
    <UserContext.Provider value={{ user, setUser,getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;