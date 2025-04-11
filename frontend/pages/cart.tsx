import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/store"; // Import removeFromCart action
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import styles from "./cart.module.css";
import { auth } from "../firebase"; // Import auth from your Firebase configuration file


type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
};

export default function CartPage() {
  const cart = useSelector((state: { cart: Product[] }) => state.cart);
  const dispatch = useDispatch();

  const saveCartToFirestore = async (cart: Product[]) => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { cart }, { merge: true }); // Save cart to Firestore
    }
  };

  const removeFromCartFirestore = async (productId: string) => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        let cart = userSnapshot.data()?.cart || [];
        cart = cart.filter((item: Product) => item.id !== productId);

        // Save the updated cart to Firestore
        await setDoc(userRef, { cart }, { merge: true });
      }
    }

    dispatch(removeFromCart(productId));  // Remove from Redux store
  };

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Shopping Cart</h1>
        <p>Your cart is empty. Start shopping now!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping Cart</h1>
      <div className={styles.cartItems}>
        {cart.map((product: Product) => (
          <div key={product.id} className={styles.cartItem}>
            <div>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => removeFromCartFirestore(product.id)}  // Remove from Firestore and Redux
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className={styles.totalPrice}>
        <p>Total: ${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}</p>
      </div>

      {/* Checkout Button */}
      <button className={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
}
