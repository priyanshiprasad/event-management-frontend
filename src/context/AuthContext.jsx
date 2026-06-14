import { createContext, useContext, useState } from "react";

// Context for auth state management
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check localStorage for existing token and user data
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Save token and user data on login
  const login = (tokenValue, userData) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);
  };

  // Logout hone pe sab hata do
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // isLoggedIn —
  const isLoggedIn = !!token;

  // role check 
  const isAdmin = user?.role === "ADMIN";
  const isOrganizer = user?.role === "ORGANIZER";
  const isAttendee = user?.role === "ATTENDEE";

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLoggedIn, isAdmin, isOrganizer, isAttendee }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — 
export function useAuth() {
  return useContext(AuthContext);
}