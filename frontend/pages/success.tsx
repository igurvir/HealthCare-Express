import { useRouter } from "next/router";
import { auth, db } from "../firebase";  // Import Firestore db
import { doc, getDoc, setDoc } from "firebase/firestore";
import styles from "./success.module.css";
import { Product } from "../store/store";

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query; // Get the session ID from query params

  const saveOrderToFirestore = async () => {
    // Fetch user info from Firebase
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) return;

    const cart = userSnapshot.data()?.cart || [];

    // Prepare order data
    const orderData = {
      user_email: user.email,
      order_date: new Date(),
      cart: cart, // Store the cart items as order items
      total_price: cart.reduce((total: number, product: Product) => total + product.price, 0),
      session_id: session_id, // Track the Stripe session ID
      payment_status: "Completed", // Can be updated later if required
    };

    // Save order to Firestore in "orders" collection
    const orderRef = doc(db, "orders", session_id as string); // Use session_id as order ID
    await setDoc(orderRef, orderData);

    // Optionally, clear the user's cart after successful payment
    await setDoc(userRef, { cart: [] }, { merge: true });
  };

  saveOrderToFirestore();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Payment Successful!</h1>
      <p className={styles.paragraph}>Thank you for your purchase! Your order is being processed.</p>
    </div>
  );
}
