import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useAuth } from "./AuthProvider";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = Cookies.get("csrfToken");
    const data = { email, password, name };

    try {
      await axios.post(`${API_URL}/api/login`, data, {
        withCredentials: true,
        headers: {
          "x-api-key": "api-key",
          "X-CSRF-Token": csrfToken,
        },
      });

      // Send request with credentials enabled
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true,
        headers: {
          "x-api-key": "api-key",
          "X-CSRF-Token": csrfToken,
        },
      });

      setUser(response.data.user);

      setMessage("Login successful");

      // Redirect after successful login
      setTimeout(() => navigate("/home"), 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      bgcolor="#fffff"
    >
      <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
        <CardHeader
          title="Welcome Back"
          subheader="Enter your details to sign in"
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {message && (
              <Typography
                color={message.includes("successful") ? "green" : "red"}
                textAlign="center"
                mt={1}
              >
                {message}
              </Typography>
            )}
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign In
              </Button>
            </CardActions>
          </form>
          {/* Register Button */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Typography variant="body2">Don't have an account?</Typography>
            <Button
              onClick={() => navigate("/register")}
              variant="text"
              sx={{ ml: 1 }}
            >
              Register
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
