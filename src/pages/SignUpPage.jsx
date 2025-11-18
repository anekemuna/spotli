import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError ] = useState("");

  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(username, email, password);
      navigate("/"); // redirect to home after signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleCreateAccount}>
        <div className="username-container">
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="email-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="password-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <div>
          <input
            type="submit"
            value="Create Account"
            disabled={loading}
          />
        </div>
      </form>

      <div className="error">{error && <p>{error}</p>}</div>

      <div className="link-login">
        Already have an account? <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
