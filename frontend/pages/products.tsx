import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/store";
import Link from "next/link";
import styles from './products.module.css';  // Import the CSS module

// Define Product Type
type Product = {
  id: string;
  price: number;
  description: string;
  category: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList: Product[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            price: data.price || 0,
            description: data.description || "⚠️ No Description Available",
            category: data.category || "⚠️ Uncategorized",
          };
        });
        setProducts(productList);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shop Our Products</h1>
      <div className={styles.productGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img
                  src="https://via.placeholder.com/200"  // Placeholder image, replace with actual product image
                  alt={product.description}
                  className={styles.productImage}
                />
              </div>
              <h2 className={styles.productTitle}>{product.description}</h2>
              <p className={styles.productCategory}>{product.category}</p>
              <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
              <button
                className={styles.addToCartButton}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
      <div className="mt-6">
        <Link href="/">
          <button className={styles.goBackButton}>Go Back</button>
        </Link>
      </div>
    </div>
  );
}
