import { useState } from "react";
import { useRouter } from "next/router";
import styles from './admin-login.module.css'; // Import styles for Admin Login

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Hardcoded admin credentials
  const adminUsername = "admin";
  const adminPassword = "admin123"; // Set a simple password

  const handleAdminLogin = () => {
    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      // Redirect to the admin dashboard on successful login
      router.push("/admin-dashboard"); // Change this to your admin dashboard route
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>Admin Login</h1>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />

        {/* Error message */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Login Button */}
        <button onClick={handleAdminLogin} className={styles.loginButton}>Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;
 