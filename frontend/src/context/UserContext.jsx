import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount safely
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      localStorage.removeItem("user"); // remove corrupted data
    }
  }, []);

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // persist
  };

  // Clear user data on logout
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // remove persisted data
    localStorage.removeItem("token"); // also remove token if stored
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
