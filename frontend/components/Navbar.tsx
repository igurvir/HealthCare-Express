import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Firebase Auth
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import styles from './Navbar.module.css';
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore"; // Ensure to import these functions
import { db } from "../firebase"; // Import Firestore db

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>(""); // To store user role
  const [loading, setLoading] = useState<boolean>(true); // Loading state for user data
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user role from Firestore
        const userRef = doc(db, "users", currentUser.uid); // Get user document reference
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userRole = docSnap.data().role;
            console.log("User role:", userRole);  // Debug log
            setRole(userRole); // Update role from Firestore
          } else {
            console.log("User not found in Firestore.");
            setRole(""); // Reset role if the user is not found
          }
          setLoading(false); // Stop loading once data is fetched
        }).catch((error) => {
          console.error("Error fetching user data: ", error);
          setLoading(false); // Stop loading in case of error
        });
      } else {
        setLoading(false); // Stop loading if user is not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login"); // Redirect to login after logout
  };

  const isLoginPage = router.pathname === "/login"; // Check if it's the login page

  if (loading) {
    return <div className={styles.loading}>Loading...</div>; // Display a loading state while fetching user data
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref>
        <h1 className={styles.brand}>HealthCare Express</h1>
      </Link>
      <div className={styles.navItems}>
        {/* Show buttons when the user is not on the login page */}
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
            {/* Add Orders Button here */}
            {role === "customer" && (
              <Link href="/orders" passHref>
                <button className={styles.navButton}>Orders</button>
              </Link>
            )}
            <button onClick={handleLogout} className={styles.navButton}>Log Out</button>
          </>
        )}

        {/* Show buttons when the user is on the login page */}
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
