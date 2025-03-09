import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import Home from "./Home";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Upload from "./Upload";

function App() {
  return (
    <Router>
      {" "}
      {/* Router component should wrap everything */}
      <AuthProvider>
        {" "}
        {/* AuthProvider should wrap the components that need access to auth */}
        <Routes>
          <Route path='/login/' element={<LoginForm />} />
          <Route path='/register/' element={<RegisterForm />} />
          <Route path='/home/' element={<Home />} />
          <Route path='/upload' element={<Upload />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
