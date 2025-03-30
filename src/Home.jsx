import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import Button from "@mui/material/Button";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const { user, logout } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      `${API_URL}/api/logout`,
      {},
      { withCredentials: true, headers: { "x-api-key": "api-key" } }
    );
    logout();
    navigate("/login");
  };

  const handleGetImage = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/s3/images/1740439302693-f210cf52db93505f5be2c4e5f477504e.jpg`,
        {},
        { withCredentials: true, headers: { "x-api-key": "api-key" } }
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
        <Button variant='contained'>
          <Link to='/upload'>Upload</Link>
        </Button>
      </nav>

      <Button variant='contained' onClick={handleGetImage}>
        Obtener imagen de S3
      </Button>

      {imageUrl && (
        <div className='image-container'>
          <img src={imageUrl} alt='Product' />
        </div>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
