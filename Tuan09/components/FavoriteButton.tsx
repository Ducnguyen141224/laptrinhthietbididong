import React from 'react';
import { Pressable, Text } from 'react-native';
import type { Book } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { selectIsFavorite, toggleWishlist } from '../store/wishlistSlice';

export default function FavoriteButton({ book }: { book: Book }) {
  const dispatch = useAppDispatch();
  const liked = useAppSelector(selectIsFavorite(book.id));
  return <Pressable onPress={() => dispatch(toggleWishlist(book))}
    style={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'white', padding: 5 }}>
    <Text style={{ color: liked ? 'red' : 'gray', fontSize: 24 }}>{liked ? '♥' : '♡'}</Text>
  </Pressable>;
}
