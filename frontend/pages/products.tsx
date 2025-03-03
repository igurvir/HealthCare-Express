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

        // ✅ Firestore Debugging
        console.log("🔥 Firestore Raw Data:");
        querySnapshot.forEach((doc) => {
          console.log("📄 Document ID:", doc.id, " Data:", doc.data());
        });

        const productList: Product[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            price: data.price || 0,
            description: data.description || "⚠️ No Description Available",
            category: data.category || "⚠️ Uncategorized",
          };
        });

        console.log("✅ Final Processed Products:", productList);
        setProducts(productList);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <h2 className={styles.productTitle}>{product.description}</h2> 
              <p className={styles.productPrice}>${product.price}</p>
              <p>{product.category}</p>
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
