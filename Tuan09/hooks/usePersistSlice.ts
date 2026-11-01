import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector, type RootState } from '../store';
import { hydrateCart } from '../store/cartSlice';
import { hydrateWishlist } from '../store/wishlistSlice';

function usePersistSlice<T>(options: {
  key: string;
  selectItems: (s: RootState) => T[];
  selectHydrated: (s: RootState) => boolean;
  hydrate: (items: T[]) => PayloadAction<T[]>;
}) {
  const { key, selectItems, selectHydrated, hydrate } = options;
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const hydrated = useAppSelector(selectHydrated);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(key)
      .then(raw => { if (active) dispatch(hydrate(raw ? JSON.parse(raw) : [])); })
      .catch(() => { if (active) dispatch(hydrate([])); });
    return () => { active = false; };
  }, [key, dispatch, hydrate]);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(key, JSON.stringify(items)).catch(console.warn);
  }, [key, items, hydrated]);

  return hydrated;
}

const cartItems = (s: RootState) => s.cart.items;
const cartReady = (s: RootState) => s.cart.hydrated;
const wishlistItems = (s: RootState) => s.wishlist.items;
const wishlistReady = (s: RootState) => s.wishlist.hydrated;

export function useAppPersistence() {
  const a = usePersistSlice({ key: '@bookstore/cart', selectItems: cartItems,
    selectHydrated: cartReady, hydrate: hydrateCart });
  const b = usePersistSlice({ key: '@bookstore/wishlist', selectItems: wishlistItems,
    selectHydrated: wishlistReady, hydrate: hydrateWishlist });
  return a && b;
}
