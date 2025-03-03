import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";


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
  initialState: [] as Product[],
  reducers: {
    addToCart: (state: any[], action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeFromCart: (state: any[], action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// Export Redux actions
export const { addToCart, removeFromCart } = cartSlice.actions;

// Configure Redux store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// Define TypeScript types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
