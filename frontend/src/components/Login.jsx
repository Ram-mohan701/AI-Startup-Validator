import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Email and password are required");
            return;
        }
        setLoading(true);
        // console.log("LOGIN EMAIL:", formData.email);
        // console.log("PASSWORD LENGTH:", formData.password.length);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"

                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            if (!data.success) {
                setError(data.message);
                return;
            }
            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="register-link">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => navigate("/register")}>
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;