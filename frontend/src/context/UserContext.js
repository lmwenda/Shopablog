'use client';

// context/UserContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
    const [user, setUser] = useState(null); // will store token
  
    // login and logout functions
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);
  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  }
  
  // Custom hook for easy access
export function useUser() {
    return useContext(UserContext);
}