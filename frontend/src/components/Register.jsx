import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"

function Register() {
    const [formData, setFormData] = useState({
        name: "",
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
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
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
                navigate("/login");
            }


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="register-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                    />

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
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>
                <p className="login-link">
                    Already have an account?{" "}
                    <button type="button" onClick={() => navigate("/login")}>
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
export default Register;