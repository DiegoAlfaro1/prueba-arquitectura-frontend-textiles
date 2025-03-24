import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get the current URL

  useEffect(() => {
    // Avoid fetching user data if already logged in or on login/register pages
    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      axios
        .get(`${API_URL}/api/auth/me`, { withCredentials: true })
        .then((res) => setUser(res.data.user))
        .catch((error) => {
          if (error.response) {
            console.warn("Acceso denegado");
            setUser(null);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // Set loading to false if on login or register
    }
  }, [user, location.pathname]); // Re-run on user change or URL change

  const logout = async () => {
    await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
