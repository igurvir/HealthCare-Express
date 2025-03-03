import { useEffect, useState } from "react";
import { db } from "../firebase"; // ✅ Ensure correct import
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/store";

// Define Product Type
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products"); // ✅ Ensure db is used correctly
        const querySnapshot = await getDocs(productsCollection);

        // ✅ Ensure Firestore data is typed correctly
        const productList: Product[] = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name ?? "No Name", // ✅ Use `??` to prevent undefined issues
              price: data.price ?? 0,
              description: data.description ?? "No description available",
              category: data.category ?? "Uncategorized",
            };
          }
        );

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p>{product.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
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
  );
}
