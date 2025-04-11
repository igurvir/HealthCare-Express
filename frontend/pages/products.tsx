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
    },
    {
      id: "2",
      name: "Triphala Churna",
      price: 12.50,
      description: "Supports digestion, detoxifies, and enhances metabolism.",
      category: "Ayurvedic",
      imageUrl: "/images/triphala.png",
    },
    {
      id: "3",
      name: "Ginseng Root Extract",
      price: 19.99,
      description: "Increases stamina, mental clarity, and supports overall well-being.",
      category: "Traditional Chinese",
      imageUrl: "/images/ginseng.png",
    },
    {
      id: "4",
      name: "Elderberry Syrup",
      price: 22.00,
      description: "Strengthens the immune system and fights seasonal flu.",
      category: "Herbal",
      imageUrl: "/images/elderberry.png",
    },
    {
      id: "5",
      name: "Turmeric Curcumin",
      price: 18.75,
      description: "Powerful anti-inflammatory and antioxidant properties.",
      category: "Ayurvedic",
      imageUrl: "/images/turmeric.png",
    },
    {
      id: "6",
      name: "Reishi Mushroom Powder",
      price: 25.00,
      description: "Supports immune function and reduces stress levels.",
      category: "Traditional Chinese",
      imageUrl: "/images/reishi.png",
    },
    {
      id: "7",
      name: "Neem Capsules",
      price: 10.99,
      description: "Purifies blood, supports skin health, and boosts immunity.",
      category: "Ayurvedic",
      imageUrl: "/images/neem.png",
    },
    {
      id: "8",
      name: "Peppermint Oil",
      price: 8.50,
      description: "Relieves headaches, improves digestion, and soothes muscles.",
      category: "Essential Oils",
      imageUrl: "/images/peppermint.png",
    },
    {
      id: "9",
      name: "Licorice Root Extract",
      price: 14.99,
      description: "Soothes sore throats, improves digestion, and supports respiratory health.",
      category: "Herbal",
      imageUrl: "/images/licorice.png",
    },
    {
      id: "10",
      name: "Black Seed Oil",
      price: 20.00,
      description: "Promotes heart health, reduces inflammation, and boosts immunity.",
      category: "Unani Medicine",
      imageUrl: "/images/blackseed.png",
    }
  ];

  const addToCartFirestore = async (product: Product) => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      let cart = userSnapshot.exists() ? userSnapshot.data()?.cart || [] : [];

      // Add product to the cart array
      cart.push(product);

      // Save the updated cart back to Firestore
      await setDoc(userRef, { cart }, { merge: true });

      // Dispatch to Redux
      dispatch(addToCart(product));
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
            <button
              className={styles.addToCartButton}
              onClick={() => addToCartFirestore(product)}  // Add product to Firestore and Redux
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
