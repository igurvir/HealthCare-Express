import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../firebase"; // Import Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";

// Define the product type
export interface Product {
  id: string;
  price: number;
  description: string;
  category: string;
}

// Create Redux slice for cart
const cartSlice = createSlice({
  name: "cart",
  initialState: [] as Product[], // Cart will initially be empty
  reducers: {
    setCart: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
    addToCart: (state: any[], action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeFromCart: (state: any[], action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;

// Configure Redux store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
