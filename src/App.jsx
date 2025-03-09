import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./loginForm";
import Upload from "./Upload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='upload' element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
