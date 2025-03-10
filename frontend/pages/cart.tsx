import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/store"; // Ensure correct import path
import styles from "./cart.module.css";

// Define Product Type
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

  const coupons = [
    { code: "SAVE10", discount: "10% off" },
    { code: "FREESHIP", discount: "Free Shipping" },
    { code: "WELCOME5", discount: "$5 off your first order" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty. Start shopping now!</p>
      ) : (
        <div className={styles.cartItems}>
          {cart.map((product: Product) => (
            <div key={product.id} className={styles.cartItem}>
              <div>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}>${product.price}</p>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => dispatch(removeFromCart(product))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Coupons Section */}
      <div className={styles.couponSection}>
        <h2 className={styles.couponHeading}>Available Coupons</h2>
        <ul className={styles.couponList}>
          {coupons.map((coupon) => (
            <li key={coupon.code} className={styles.couponItem}>
              <span>{coupon.discount}</span>
              <span className={styles.couponCode}>{coupon.code}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <p>&copy; 2025 HealthCare_Express. All rights reserved.</p>
      </footer>
    </div>
  );
}
