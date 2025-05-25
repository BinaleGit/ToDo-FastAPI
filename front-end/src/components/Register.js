import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const Register = (email, password) => {
    if (!email || !password) return;
    console.log(email);
    console.log(password);
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .catch((err) => console.error("Error:", err));
  };


  return (
    <div className="App">
      <h2>Register</h2>
      <input
        type="text"
        name="Username"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        name="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => Register(email, password)}>Add Task</button>
    </div>
  );
}

export default Register;
