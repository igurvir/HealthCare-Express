// pages/cart.tsx

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/store"; // your Redux remove action
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./cart.module.css";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("Stripe public key is missing in environment variables.");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
      alert("Stripe failed to load.");
      return;
    }

    console.log("Ready to checkout. Cart contents:", cart);

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          user_email: "user@example.com",
          cart_id: "12345",
        }),
      });

      // Log the raw response status
      console.log("Checkout Session creation status:", response.status);

      const session = await response.json();
      console.log("Checkout Session response JSON:", session);

      if (response.ok && session?.id) {
        // Redirect to Stripe checkout
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
          console.error("Stripe Checkout Error:", error);
          alert("Error redirecting to checkout.");
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
        <p>
          Total: $
          {cart.reduce((total, product) => total + product.price, 0).toFixed(2)}
        </p>
      </div>

      {/* Checkout Button */}
      <button className={styles.checkoutButton} onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}
