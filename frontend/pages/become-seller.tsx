import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import styles from './become-seller.module.css'; // Become seller styling

const BecomeSeller: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleBecomeSeller = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to become a seller.");
      return;
    }

    try {
      setIsProcessing(true);

      // Reference to the current user's document in Firestore
      const userRef = doc(db, "users", user.uid);

      // Update role to "SELLER"
      await updateDoc(userRef, {
        role: "SELLER",
      });

      setIsProcessing(false);
      router.push("/seller-dashboard");  // Redirect to seller dashboard after becoming a seller
    } catch (err) {
      setError("Error becoming a seller. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Become a Seller</h1>
      <p>Click below to become a seller on HealthCare Express.</p>

      {error && <p className={styles.error}>{error}</p>}

      <button onClick={handleBecomeSeller} className={styles.button} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Become a Seller"}
      </button>
    </div>
  );
};

export default BecomeSeller;
