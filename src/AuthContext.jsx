import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error states
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/register`, {
          credentials: "include", // Important to include cookies
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        setError("Token inválido o expirado. Por favor, inicia sesión.");
        navigate("/login"); // Redirect to login page
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading, error, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
