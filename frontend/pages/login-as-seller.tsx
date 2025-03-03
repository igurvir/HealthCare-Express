import { useState } from "react";
import { auth, db } from "../firebase"; // Ensure Firebase setup is correct
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import styles from './login-as-seller.module.css';
import { doc, getDoc } from "firebase/firestore";

const LoginAsSeller: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Attempt to sign in the user
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Log user information for debugging purposes
      console.log("User logged in successfully:", user);

      // Get the user's role from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const role = userSnap.data().role;

        console.log("User role from Firestore:", role); // Log role for debugging

        if (role === "SELLER") {
          // Redirect to Seller Dashboard if role is "SELLER"
          router.push("/seller-dashboard");
        } else {
          setError("You are not authorized as a seller.");
        }
      } else {
        setError("User does not exist in Firestore.");
      }
    } catch (err: any) {
      console.error("Error during login:", err.message); // Log detailed error
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login as Seller</h1>

      {/* Email Input */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.inputField}
      />

      {/* Password Input */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.inputField}
      />

      {/* Error message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Login Button */}
      <button onClick={handleLogin} className={styles.button}>Login</button>
    </div>
  );
};

export default LoginAsSeller;
