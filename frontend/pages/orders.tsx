// pages/orders.tsx
import { useEffect, useState } from "react";
import { db } from "../firebase"; // Firebase Firestore
import { auth } from "../firebase"; // Firebase Auth
import { doc, getDoc } from "firebase/firestore";
import styles from "./orders.module.css";

type Order = {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const fetchedOrders = userSnapshot.data().orders || [];
          console.log("Fetched Orders: ", fetchedOrders); // Debugging log
          setOrders(fetchedOrders);
        } else {
          console.log("User not found or no orders.");
        }
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Orders</h1>
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderItem}>
            <h3>{order.productName}</h3>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: ${order.price}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
