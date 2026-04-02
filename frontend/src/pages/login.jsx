import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userapi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                alert("Please fill in all the fields");
                return;
            }
            if (!email.includes('@')) {
                alert("Please enter a valid email");
                return;
            }
            if (password.length < 6) {
                alert("Password must be at least 6 characters long");
                return;
            }   
            const user = await loginUser(email, password);
            console.log(user);
            alert("Login successful");
            navigate("/"); // Redirect to Dashboard
        } catch (err) {
            alert(err.message);
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;