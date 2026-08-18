import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🚀 AI Startup Validator</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">🏠 Home</Link>
        </li>

        <li>
          <Link to="/history">📜 History</Link>
        </li>

        <li>
          <button onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;