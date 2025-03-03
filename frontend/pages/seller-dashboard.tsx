import { useState, useEffect } from "react";
import styles from './seller-dashboard.module.css'; // Add styles for this page

const SellerDashboard: React.FC = () => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [activeListings, setActiveListings] = useState<number>(0);
  const [newOrders, setNewOrders] = useState<number>(0);

  useEffect(() => {
    // Simulate fetching dashboard data (you can replace this with real API data)
    setTotalSales(120);
    setTotalRevenue(15000);
    setActiveListings(50);
    setNewOrders(10);
  }, []);

  return (
    <div className={styles.container}>
      {/* Dashboard Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Seller Dashboard</h1>
        <div className={styles.headerButtons}>
          <button className={styles.addProductButton}>+ Add New Product</button>
        </div>
      </header>

      {/* Dashboard Metrics */}
      <section className={styles.dashboardStats}>
        <div className={styles.statsCard}>
          <h3>Total Sales</h3>
          <p>{totalSales}</p>
        </div>
        <div className={styles.statsCard}>
          <h3>Total Revenue</h3>
          <p>${totalRevenue}</p>
        </div>
        <div className={styles.statsCard}>
          <h3>Active Listings</h3>
          <p>{activeListings}</p>
        </div>
        <div className={styles.statsCard}>
          <h3>New Orders</h3>
          <p>{newOrders}</p>
        </div>
      </section>

      {/* Product Listings Section */}
      <section className={styles.productListings}>
        <h2>Your Product Listings</h2>
        <div className={styles.filterOptions}>
          <select>
            <option value="all">All Categories</option>
            <option value="herbal">Herbal</option>
            <option value="ayurvedic">Ayurvedic</option>
            <option value="homeopathic">Homeopathic</option>
            <option value="indigenous">Indigenous</option>
          </select>
          <select>
            <option value="all">All Prices</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <div className={styles.productGrid}>
          {/* Sample Product Cards */}
          <div className={styles.productCard}>
            <img src="/images/herbal.jpg" alt="Product" />
            <h3>Herbal Medicine</h3>
            <p>$20</p>
          </div>
          <div className={styles.productCard}>
            <img src="/images/ayurvedic.jpg" alt="Product" />
            <h3>Ayurvedic Remedy</h3>
            <p>$30</p>
          </div>
        </div>
      </section>

      {/* Inventory Management */}
      <section className={styles.inventoryManagement}>
        <h2>Inventory Management</h2>
        <button className={styles.manageInventoryButton}>Manage Inventory</button>
      </section>
    </div>
  );
};

export default SellerDashboard;
