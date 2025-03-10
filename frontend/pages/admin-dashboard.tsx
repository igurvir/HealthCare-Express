import { useState } from "react";
import styles from './admin-dashboard.module.css'; // Admin dashboard styling

export default function AdminDashboard() {
  // Hardcoded Users
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "seller" },
    { id: "3", name: "Mark Johnson", email: "mark@example.com", role: "customer" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "seller" },
  ];

  // Hardcoded Orders
  const orders = [
    { id: "101", user: "John Doe", totalPrice: 100, status: "Shipped" },
    { id: "102", user: "Jane Smith", totalPrice: 50, status: "Processing" },
    { id: "103", user: "Mark Johnson", totalPrice: 75, status: "Delivered" },
    { id: "104", user: "Alice Brown", totalPrice: 120, status: "Shipped" },
  ];

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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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
              <th>Order ID</th>
              <th>User</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user}</td>
                <td>${order.totalPrice}</td>
                <td>{order.status}</td>
              </tr>
            ))}
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
