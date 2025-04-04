import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Upload from "./Upload";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthProvider";
import Checkout from "./Checkout"; // ✅ Importa el componente de Checkout
import useCsrfToken from "./assets/hooks/useCsrfToken";

function App() {
  useCsrfToken();

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login/" element={<LoginForm />} />
          <Route path="/register/" element={<RegisterForm />} />
          <Route
            path="/home/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout" // ✅ Ruta protegida para ir al pago
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
