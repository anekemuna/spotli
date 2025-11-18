import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleCreateAccount = () => {};

  return (
    <div className="sign-up-page">
      <h1>Sign Up</h1>
      <form>
         <div className="username-container">
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </div>
        <div>
          <input type="submit" value="Create Account" onClick={handleCreateAccount} />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
