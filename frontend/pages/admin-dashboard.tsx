import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import styles from './admin-dashboard.module.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/admin-login");
      return;
    }

    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const userList: any[] = [];
    const allOrders: any[] = [];

    for (const docSnap of usersSnapshot.docs) {
      const data = docSnap.data();
      userList.push({ id: docSnap.id, ...data });

      if (Array.isArray(data.orders)) {
        data.orders.forEach((order: any) => {
          allOrders.push(order);
        });
      }
    }

    const productsSnapshot = await getDocs(collection(db, "products"));
    const productList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setUsers(userList);
    setOrders(allOrders);
    setProducts(productList);
    setLoading(false);
  };

  const totalSales = orders.reduce((acc, order) => acc + (order.price || 0), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : "0.00";

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      {/* Users Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Users</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.role || "customer"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Orders</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.price}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Products</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.quantityAvailable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales Analytics Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sales Analytics</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Total Orders</th>
              <th>Total Sales ($)</th>
              <th>Average Order Value ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalOrders}</td>
              <td>${totalSales.toFixed(2)}</td>
              <td>${averageOrderValue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Actions Section */}
      <div className={styles.actions}>
        <button className={styles.actionButton}>Add New User</button>
        <button className={styles.actionButton}>View Reports</button>
      </div>
    </div>
  );
}
