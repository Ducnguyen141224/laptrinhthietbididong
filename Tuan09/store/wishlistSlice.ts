import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../types';
import type { RootState } from './index';

type WishlistState = { items: Book[]; hydrated: boolean };
const initialState: WishlistState = { items: [], hydrated: false };

const wishlistSlice = createSlice({
  name: 'wishlist', initialState,
  reducers: {
    toggleWishlist(state, a: PayloadAction<Book>) {
      const i = state.items.findIndex(b => b.id === a.payload.id);
      if (i >= 0) state.items.splice(i, 1);
      else state.items.push(a.payload);
    },
    hydrateWishlist(state, a: PayloadAction<Book[]>) {
      state.items = Array.isArray(a.payload) ? a.payload : [];
      state.hydrated = true;
    },
  },
});

export const { toggleWishlist, hydrateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
export const selectWishlist = (s: RootState) => s.wishlist.items;
export const selectIsFavorite = (id: string) => (s: RootState) => s.wishlist.items.some(b => b.id === id);
