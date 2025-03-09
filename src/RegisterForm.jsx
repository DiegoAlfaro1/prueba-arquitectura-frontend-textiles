import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {
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
        `${process.env.REACT_APP_API_URL}/register`,
        data
      );
      setMessage(response.data.message);
    } catch (error) {
      console.log("Error:", error);
      setMessage("error ocurred");
    }
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <div>
          <label htmlFor='email'>Email: </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

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
    </div>
  );
}
