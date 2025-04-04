import { useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function useCsrfToken() {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await axios.get(`${API_URL}/csrf-token`, {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  return null;
}
