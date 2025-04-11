// pages/products.tsx
import { useDispatch } from "react-redux";
import { addToCart } from "../store/store"; // Import addToCart action
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import styles from "./products.module.css";
import { auth } from "../firebase"; // Import auth from your Firebase configuration file

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  quantityAvailable: number; // Available quantity for the product
};

export default function ProductsPage() {
  const dispatch = useDispatch();

  // Hardcoded Products
  const products: Product[] = [
    {
      id: "1",
      name: "Ashwagandha Powder",
      price: 15.99,
      description: "Boosts energy, reduces stress, and improves immunity.",
      category: "Ayurvedic",
      imageUrl: "/images/ashwagandha.png",
      quantityAvailable: 10, // Initial available quantity
    },
    {
      id: "2",
      name: "Triphala Churna",
      price: 12.50,
      description: "Supports digestion, detoxifies, and enhances metabolism.",
      category: "Ayurvedic",
      imageUrl: "/images/triphala.png",
      quantityAvailable: 8,
    },
    {
      id: "3",
      name: "Ginseng Root Extract",
      price: 19.99,
      description: "Increases stamina, mental clarity, and supports overall well-being.",
      category: "Traditional Chinese",
      imageUrl: "/images/ginseng.png",
      quantityAvailable: 22,
    },
    {
      id: "4",
      name: "Elderberry Syrup",
      price: 22.00,
      description: "Strengthens the immune system and fights seasonal flu.",
      category: "Herbal",
      imageUrl: "/images/elderberry.png",
      quantityAvailable: 49,
    },
    {
      id: "5",
      name: "Turmeric Curcumin",
      price: 18.75,
      description: "Powerful anti-inflammatory and antioxidant properties.",
      category: "Ayurvedic",
      imageUrl: "/images/turmeric.png",
      quantityAvailable: 77,
    },
    {
      id: "6",
      name: "Reishi Mushroom Powder",
      price: 25.00,
      description: "Supports immune function and reduces stress levels.",
      category: "Traditional Chinese",
      imageUrl: "/images/reishi.png",
      quantityAvailable: 23,
    },
    {
      id: "7",
      name: "Neem Capsules",
      price: 10.99,
      description: "Purifies blood, supports skin health, and boosts immunity.",
      category: "Ayurvedic",
      imageUrl: "/images/neem.png",
      quantityAvailable: 5,
    },
    {
      id: "8",
      name: "Peppermint Oil",
      price: 8.50,
      description: "Relieves headaches, improves digestion, and soothes muscles.",
      category: "Essential Oils",
      imageUrl: "/images/peppermint.png",
      quantityAvailable: 56,
    },
    {
      id: "9",
      name: "Licorice Root Extract",
      price: 14.99,
      description: "Soothes sore throats, improves digestion, and supports respiratory health.",
      category: "Herbal",
      imageUrl: "/images/licorice.png",
      quantityAvailable: 80,
    },
    {
      id: "10",
      name: "Black Seed Oil",
      price: 20.00,
      description: "Promotes heart health, reduces inflammation, and boosts immunity.",
      category: "Unani Medicine",
      imageUrl: "/images/blackseed.png",
      quantityAvailable: 12,
    }
  ];
    // Add quantityAvailable to other products similarly...
  

  // Add product to Firestore and Redux
  const addToCartFirestore = async (product: Product) => {
    const user = auth.currentUser;
    if (user && product.quantityAvailable > 0) {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      let cart = userSnapshot.exists() ? userSnapshot.data()?.cart || [] : [];

      // Add product to the cart array
      cart.push(product);

      // Update quantityAvailable for the product in Firestore
      const updatedProduct = {
        ...product,
        quantityAvailable: product.quantityAvailable - 1, // Decrease available quantity by 1
      };

      // Save the updated cart and product in Firestore
      await setDoc(userRef, { cart }, { merge: true });

      // Save the updated product in a separate collection (optional)
      await setDoc(doc(db, "products", product.id), updatedProduct, { merge: true });

      // Dispatch to Redux to update the cart
      dispatch(addToCart(updatedProduct));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Traditional Medicines</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.productImage}
              />
            </div>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productCategory}>{product.category}</p>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <p className={styles.quantityAvailable}>Available: {product.quantityAvailable}</p> {/* Show available quantity */}
            <button
              className={styles.addToCartButton}
              onClick={() => addToCartFirestore(product)}  // Add product to Firestore and Redux
              disabled={product.quantityAvailable <= 0}  // Disable button if no stock
            >
              {product.quantityAvailable > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
