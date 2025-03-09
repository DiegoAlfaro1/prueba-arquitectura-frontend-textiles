import { Link } from "react-router-dom";

function Home() {
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
