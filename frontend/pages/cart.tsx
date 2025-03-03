import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/store"; // Ensure correct import path

// Define Product Type
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
};

export default function CartPage() {
  // Explicitly type Redux cart state as Product[]
  const cart = useSelector((state: { cart: Product[] }) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cart.map((product: Product) => (
            <div key={product.id} className="p-4 border rounded shadow">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => dispatch(removeFromCart(product))}
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
