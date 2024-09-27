import React, { createContext, useState, useContext } from "react";

// Create the authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const login = () => {
    setIsLoggedIn(true); // Log in the user
  };

  const logout = () => {
    setIsLoggedIn(false); // Log out the user
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
