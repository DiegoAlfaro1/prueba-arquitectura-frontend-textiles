import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

function ContinuousSlider() {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction='row' sx={{ alignItems: "center", mb: 1 }}>
        <VolumeDown />
        <Slider aria-label='Volume' value={value} onChange={handleChange} />
        <VolumeUp />
      </Stack>
      <Slider disabled defaultValue={30} aria-label='Disabled slider' />
    </Box>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handelSubmit = async (event) => {
    event.preventDefault();

    const data = { email, password, name };
    console.log(data);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        data
      );

      localStorage.setItem("token", response.data.token);
      Cookies.set("token", response.data.token, { expires: 1 });

      setMessage("Login successful");
    } catch (error) {
      console.log("Error:", error);
      setMessage("error ocurred");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handelSubmit}>
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button type='submit'>Submit</button>
      </form>

      {message && <p>{message}</p>}

      <ContinuousSlider />
    </div>
  );
}
