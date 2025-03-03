import { useState } from "react";
import { auth, db } from "../firebase";  // Ensure this is correctly pointing to your firebase setup
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import styles from './seller-login.module.css'; // Update styles as needed
import { doc, getDoc } from "firebase/firestore";

const SellerLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Check the user's role in Firestore (SELLER role)
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const role = userSnap.data().role;

        if (role === "SELLER") {
          // Redirect to Seller Dashboard if role is SELLER
          router.push("/seller-dashboard");
        } else {
          setError("You are not authorized as a seller.");
        }
      }
    } catch (err) {
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

export default SellerLogin;
