import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import Button from "@mui/material/Button";
import { useState } from "react";
import BotonPago from "./BotonPago"; // ✅ Importar el botón de pago
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const { user, logout } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const csrfToken = Cookies.get("csrfToken");

    await axios.post(
      `${API_URL}/api/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "x-api-key": "api-key",
          "X-CSRF-Token": csrfToken,
        },
      }
    );
    logout();
    navigate("/login");
  };

  const handleGetImage = async () => {
    const csrfToken = Cookies.get("csrfToken");

    try {
      const response = await axios.get(
        `${API_URL}/s3/images/1743786663760-de7d6f8790f1119bf5299f1d15af8726.jpg`,
        {},
        {
          withCredentials: true,
          headers: {
            "x-api-key": "api-key",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      const url = response.data.url;
      setImageUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Welcome to My React App</h1>
      <nav>
        <Button variant="contained">
          <Link to="/upload">Upload</Link>
        </Button>
      </nav>
      <Button variant="contained" onClick={handleGetImage}>
        Obtener imagen de S3
      </Button>
      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="Product" />
        </div>
      )}
      <br />
      <h2>Pago con Mercado Pago</h2>
      <BotonPago /> {/* ✅ Botón de pago integrado */}
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
