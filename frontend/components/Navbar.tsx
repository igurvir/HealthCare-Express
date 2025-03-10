import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Firebase Auth
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import styles from './Navbar.module.css';
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore"; // Make sure to import these functions
import { db } from "../firebase"; // Ensure you import db from firebase.js (Firebase Firestore initialization)

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>(""); // To store user role
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user role from Firestore
        const userRef = doc(db, "users", currentUser.uid); // Get user document reference
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            setRole(docSnap.data().role); // Update role from Firestore
          } else {
            console.log("User not found in Firestore.");
            setRole(""); // Reset role if the user is not found
          }
        }).catch((error) => {
          console.error("Error fetching user data: ", error);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login after logout
  };

  const isLoginPage = router.pathname === "/login"; // Check if it's the login page

  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref>
        <h1 className={styles.brand}>HealthCare Express</h1>
      </Link>
      <div className={styles.navItems}>
        {!isLoginPage && (
          <>
            <Link href="/products" passHref>
              <button className={styles.navButton}>Products</button>
            </Link>
            <Link href="/cart" passHref>
              <button className={styles.navButton}>Shopping Cart</button>
            </Link>
            {role === "admin" && (
              <Link href="/admin-dashboard" passHref>
                <button className={styles.navButton}>Admin Dashboard</button>
              </Link>
            )}
            {role === "seller" && (
              <Link href="/seller-dashboard" passHref>
                <button className={styles.navButton}>Seller Dashboard</button>
              </Link>
            )}
            <button onClick={handleLogout} className={styles.navButton}>Log Out</button>
          </>
        )}

        {isLoginPage && (
          <>
            <Link href="/admin-login" passHref>
              <button className={styles.navButton}>Admin</button>
            </Link>
          
            <Link href="/login-as-seller" passHref>
             <button className={styles.navButton}>Seller</button>
            </Link>

            <Link href="/login" passHref>
              <button className={styles.navButton}>Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
