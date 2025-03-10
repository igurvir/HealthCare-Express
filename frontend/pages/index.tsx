import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from './index.module.css';
import { auth } from "../firebase";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const categories = [
    { name: "Herbal", image: "/images/herbal.jpg", description: "Natural plant-based remedies with modern applications" },
    { name: "Ayurvedic", image: "/images/ayurvedic.jpg", description: "Ancient Indian healing system focusing on holistic well-being" },
    { name: "Homeopathic", image: "/images/homeopathic.jpg", description: "Natural remedies based on the principle of 'like cures like'" },
    { name: "Indigenous", image: "/images/indigenous.jpg", description: "Cultural healing traditions passed down through generations" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) router.push("/login");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  const handleBecomeSeller = () => {
    router.push("/become-seller"); // Navigate to the "Become Seller" page
  };

  return (
    <div className={styles.container}>
      {/* Banner Section */}
      <section className={styles.banner}>
        <h1 className={styles.heading}>Traditional Medicine Marketplace</h1>
        <p className={styles.subheading}>
          Discover authentic traditional medicines from trusted sellers worldwide. Browse our curated collection of Herbal, Ayurvedic, Homeopathic, and Indigenous remedies.
        </p>
        <div className={styles.buttons}>
          <button className={styles.sellerButton} onClick={handleBecomeSeller}>Become a Seller</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2 className={styles.categoriesHeading}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <img
                src={category.image}
                alt={category.name}
                className={styles.categoryImage}
              />
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <p className={styles.categoryDescription}>{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className={styles.testimonials}>
        <h2 className={styles.testimonialsHeading}>What Our Customers Say</h2>
        <div className={styles.testimonialCards}>
          <div className={styles.testimonialCard}>
            <div className={styles.rating}>⭐⭐⭐⭐⭐</div>
            <p>"I've been using Ayurvedic remedies from HealthCare for months now. The quality is exceptional and the results speak for themselves. Highly recommended!"</p>
            <p>- Sarah Johnson</p>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.rating}>⭐⭐⭐⭐⭐</div>
            <p>"As someone who values traditional medicine, finding HealthCare Express was a game-changer. The Indigenous remedies are authentic and the service is excellent."</p>
            <p>- Michael Chen</p>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.rating}>⭐⭐⭐⭐⭐</div>
            <p>"I've been a seller on HealthCare for over a year now. The platform is user-friendly and has helped me reach customers worldwide for my homeopathic products."</p>
            <p>- Dr. Amara Patel</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <h2 className={styles.newsletterHeading}>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest products, traditional medicine insights, and exclusive offers.</p>
        <div className={styles.newsletterForm}>
          <input type="email" placeholder="Your email address" className={styles.newsletterInput} />
          <button className={styles.newsletterButton}>Subscribe</button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <p>&copy; 2025 HealthCare_Express. All rights reserved.</p>
      </footer>
    </div>
  );
}
