// pages/cart.tsx

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/store"; // Import removeFromCart action
import { useRouter } from "next/router";
import { loadStripe } from '@stripe/stripe-js';
import styles from "./cart.module.css";

// Load your Stripe public key (this is safe to expose)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

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
  const router = useRouter();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to load.");
      alert("Stripe failed to load.");
      return;
    }

    console.log("Stripe successfully loaded:", stripe);

    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart, // Pass the cart data to the API
          user_email: 'user@example.com', // Replace with real user email if available
          cart_id: '12345', // You can track the cart ID for analytics
        }),
      });

      const session = await response.json();

      // Check if session is created successfully
      if (session?.id) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id, // Use the session ID returned from the backend
        });

        if (error) {
          console.error("Stripe Checkout Error:", error);
          alert("Error redirecting to checkout.");
        } else {
          console.log("Redirecting to Stripe Checkout...");
        }
      } else {
        alert("Error creating Stripe session.");
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("Error during checkout. Please try again.");
    }
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
              onClick={() => handleRemoveFromCart(product.id)}
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
      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}
