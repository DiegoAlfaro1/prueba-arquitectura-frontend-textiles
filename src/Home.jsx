import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const { user, logout } = useAuth();
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

  return (
    <div>
      <h1>Welcome to My React App</h1>
      <nav>
        <ul>
          <li>
            <Link to='/upload'>Upload</Link>
          </li>
        </ul>
      </nav>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
