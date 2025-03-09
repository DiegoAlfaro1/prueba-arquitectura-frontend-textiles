import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Upload from "./Upload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login/' element={<LoginForm />} />
        <Route path='/register/' element={<RegisterForm />} />
        <Route path='/home/' element={<Home />} />
        <Route path='upload' element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
