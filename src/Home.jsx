import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

function Home() {
  const { user, loading } = useAuth();

  // Show loading message until auth state is checked
  if (loading) return <p>Loading...</p>;

  // Redirect to login if the user is not authenticated
  if (!user) return <Navigate to='/login' />;

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
    </div>
  );
}

export default Home;
