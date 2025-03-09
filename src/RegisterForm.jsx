import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // New state for checkbox
  const navigate = useNavigate(); // Initialize the navigate function

  const handelSubmit = async (event) => {
    event.preventDefault();

    if (!termsAccepted) {
      setMessage("You must accept the terms and conditions.");
      return;
    }

    const data = { email, password, name };

    try {
      const response = await axios.post(`${API_URL}/api/register`, data);
      setMessage(response.data.message);

      // Redirect to login page after successful registration
      setTimeout(() => navigate("/login"), 1000); // Redirect to login after 1 second
    } catch (error) {
      console.log("Error:", error);
      setMessage("An error occurred during registration.");
    }
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='90vh'
      bgcolor='#fffff'
    >
      <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
        <CardHeader
          title='Create an Account'
          subheader='Enter your details to sign up'
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <form onSubmit={handelSubmit}>
            <TextField
              fullWidth
              label='Name'
              variant='outlined'
              margin='normal'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label='Email'
              type='email'
              variant='outlined'
              margin='normal'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label='Password'
              type='password'
              variant='outlined'
              margin='normal'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  color='primary'
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }} // Smaller checkbox
                />
              }
              label={
                <Typography variant='body2' sx={{ fontSize: "0.75rem" }}>
                  I agree to the{" "}
                  <a
                    href='/terms-of-service'
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ fontSize: "0.75rem" }}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href='/privacy-policy'
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ fontSize: "0.75rem" }}
                  >
                    Privacy Policy
                  </a>
                </Typography>
              }
            />
            {message && (
              <Typography
                color={message.includes("successful") ? "green" : "red"}
                textAlign='center'
                mt={2}
              >
                {message}
              </Typography>
            )}
            <CardActions>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{ mt: 2 }}
              >
                Create Account
              </Button>
            </CardActions>
          </form>
        </CardContent>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <Typography
            variant='body2'
            color='textSecondary'
            sx={{ fontSize: "0.75rem" }}
          >
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/login")}
              variant='text'
              sx={{ fontSize: "0.75rem" }}
            >
              Sign In
            </Button>
          </Typography>
        </div>
      </Card>
    </Box>
  );
}
