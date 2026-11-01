import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book, CartItem } from '../types';
import type { RootState } from './index';

type CartState = { items: CartItem[]; hydrated: boolean };
const initialState: CartState = { items: [], hydrated: false };
const clamp = (q: number, stock: number) => Math.max(1, Math.min(Math.round(q) || 1, stock));

const cartSlice = createSlice({
  name: 'cart', initialState,
  reducers: {
    addToCart(state, a: PayloadAction<Book>) {
      const book = a.payload;
      if (book.stock <= 0) return;
      const item = state.items.find(i => i.book.id === book.id);
      if (item) {
        item.book = book;
        item.quantity = clamp(item.quantity + 1, book.stock);
      } else state.items.push({ book, quantity: 1 });
    },
    setQuantity(state, a: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find(i => i.book.id === a.payload.id);
      if (item) item.quantity = clamp(a.payload.quantity, item.book.stock);
    },
    removeFromCart(state, a: PayloadAction<string>) {
      state.items = state.items.filter(i => i.book.id !== a.payload);
    },
    hydrateCart(state, a: PayloadAction<CartItem[]>) {
      state.items = (Array.isArray(a.payload) ? a.payload : [])
        .filter(i => i?.book?.id && i.book.stock > 0)
        .map(i => ({ book: i.book, quantity: clamp(i.quantity, i.book.stock) }));
      state.hydrated = true;
    },
  },
});

export const { addToCart, setQuantity, removeFromCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (s: RootState) => s.cart.items;
export const selectCartCount = (s: RootState) => s.cart.items.reduce((n, i) => n + i.quantity, 0);
