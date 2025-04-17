![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)
![CSS](https://img.shields.io/badge/CSS3-Styling-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange.svg)



# HealthCare Express  
**HealthCare Express** is a modern, secure, and scalable web application built with **TypeScript**, **JavaScript**, and **Firebase**. It serves as a dedicated **marketplace for traditional and herbal medicines**, including Ayurvedic, Homeopathic, and Indigenous remedies. Despite the massive global demand for alternative healthcare solutions, the market remains fragmented — lacking a unified, trusted digital platform.  

HealthCare Express addresses this gap by offering a seamless experience for both buyers and sellers. From user authentication and real-time inventory tracking to secure payments and role-based admin management, the platform is built with accessibility, reliability, and growth in mind. Developed with an agile approach, HealthCare Express is structured for long-term scalability and optimized for secure, efficient commerce in the traditional medicine space.

---

## Table of Contents  
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [System Architecture](#system-architecture)  
4. [Workflow](#workflow)  
5. [How to Run](#how-to-run)  
6. [Team Roles](#team-roles)  
7. [License](#license)

---

## Features  

### 🔐 Authentication & Authorization  
- Secure user registration and login with Firebase Authentication.  
- Email-based login and social sign-in options.  
- Role-Based Access Control (RBAC) for Admins, Sellers, and Customers.  

### 🧑‍💼 Seller Functionality  
- Sellers can register and manage their own storefront.  
- Add, update, and delete products with images, descriptions, and pricing.  
- Access order history and performance analytics via the seller dashboard.

### 🛍️ Product Listings  
- Public-facing product page displaying all available medicines (Herbal, Ayurvedic, Traditional).  
- Category-based filtering and search functionality.  
- Each product includes details like name, ingredients, price, seller, and stock availability.

### 🛒 Shopping Cart  
- Users can add/remove products to their cart.  
- Update quantities and view total cost before checkout.  
- Cart state synced in real time for a smooth shopping experience.

### 💳 Secure Payment Integration  
- Integrated with **Stripe API** for fast, secure checkout.  
- Real-time payment validation and status tracking.  
- Users receive order confirmations upon successful transaction.

### 📦 Order Management  
- Buyers can view and track order status in real time.  
- Admins and sellers can update order status and manage fulfillment.  
- Order summaries and history available to both users and sellers.

### 📊 Admin Dashboard  
- Full access to user and seller management tools.  
- Ability to approve or reject products and sellers.  
- Real-time stock alerts and system activity monitoring.

### 🚨 Alert & Notification System  
- Low stock alerts for admins and sellers.  
- System error messages and feedback displayed for smooth UX.  
- Optional push notifications for orders and cart reminders.

### 🧱 Scalable Modular Design  
- Clean separation of responsibilities across services and components.  
- Built using scalable frontend and backend modules.  
- Firebase Firestore ensures real-time syncing and easy scalability.


---

## Tech Stack  

- **Frontend:**  CSS, JavaScript, TypeScript  
- **Backend:** Firebase (Authentication, Firestore, Functions)  
- **Database:** Firebase Firestore (NoSQL, real-time syncing)  
- **Authentication:** Firebase Authentication with Email & Social Login  
- **Notifications:** In-app alerts, low stock warnings, and optional push notifications  
- **Testing:** Manual testing and modular validation (Jest or Cypress if extended)  
- **Project Management:** Jira (Agile Sprints, Task Workflow)


---

## System Architecture  

Follows a **5-layered architecture**:

1. **Presentation Layer** – User-facing UI (Admin Panel, Order Views)  
2. **Application Layer** – Handles business logic and use cases  
3. **Domain Layer** – Core entities and business rules  
4. **Infrastructure Layer** – Handles third-party integrations  
5. **Persistence Layer** – Database interaction and repository access

---

## Workflow  

All tasks follow a Jira-based Agile workflow:  
```plaintext
TO DO → ANALYZE → DESIGN → IMPLEMENT → TEST → DONE
```
## Sprint Breakdown

Each sprint focuses on a key module:

Sprint 1: Authentication & Security

Sprint 2: Shopping Cart + Role Management

Sprint 3: Admin Dashboard + Payment Gateway

Sprint 4: Order Management, DB Access, and Alerts

## How to Run


Clone the repository:
```
git clone https://github.com/igurvir/healthcare-express.git
```
Open the solution in Visual Studio (2022 or later).

Ensure connection to your Database

dotnet run
Navigate to:
```
https://localhost:3000
```
to access the Application

## Team Roles

Jashan Kalsi (Scrum Master + Developer):

Sprint planning, workflow design, admin & infrastructure module lead.

Gurvir Singh (Dev Team Lead):

Frontend/backend implementation, user/order modules, and RBAC integration.

