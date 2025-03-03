import { useState, useEffect } from "react";
import { auth, db } from "../firebase";  // Firebase Auth and Firestore
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import styles from './login.module.css'; // Import styles from CSS Module

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign Up and Login
  const router = useRouter();

  // Redirect user if already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) router.push("/"); // Redirect to home if logged in
    });
    return () => unsubscribe();
  }, [router]);

  // Handle Email/Password Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to home page after login
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Handle Email/Password Sign Up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        name: "No Name",  // Default name, you can add a field for name in the sign-up form
        role: "CUSTOMER", // Default role, you can change this based on your logic
        photoURL: "",  // Default photo URL, you can add a field for profile pictures
      });

      alert("Sign-up successful! You can now log in.");
      setIsSignUp(false); // Switch to Login page after successful sign-up
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      // Handle Google sign-in (already implemented)
      router.push("/"); // Redirect to home page after Google login
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Handle Password Reset
  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>{isSignUp ? "Sign Up" : "Login"}</h1>
        
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        
        {/* Login or Sign Up Button */}
        <div>
          {isSignUp ? (
            <button onClick={handleSignUp} className={styles.loginButton}>Sign Up</button>
          ) : (
            <button onClick={handleLogin} className={styles.loginButton}>Login</button>
          )}
        </div>

        {/* Toggle between Login/Sign Up */}
        <p className={styles.toggleText}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            className={styles.toggleLink}
            onClick={() => setIsSignUp(!isSignUp)} // Toggle between Login and Sign Up
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
        
        {/* Forgot Password Link */}
        {!isSignUp && (
          <p className={styles.forgotPassword}>
            <span
              className={styles.link}
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </span>
          </p>
        )}

        {/* Google Sign-In Button */}
        <button onClick={handleGoogleLogin} className={styles.googleButton}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
