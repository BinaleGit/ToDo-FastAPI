import { useState } from "react";

function Login({ setUser }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = (email, password) => {
        if (!email || !password) return;

        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Login failed");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data.id);
            })
            .catch((err) => console.error("Error:", err));
    };


    return (
        <div className="App">
            <h2>Login</h2>
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
            <button onClick={() => login(email, password)}>Add Task</button>
        </div>
    );
}

export default Login;
