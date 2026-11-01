import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import type { Book } from '../types';
import { formatVND } from '../utils/format';
import FavoriteButton from './FavoriteButton';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/cartSlice';

export default function BookCard({ book, onPress }: { book: Book; onPress: (id: string) => void }) {
  const dispatch = useAppDispatch();
  return <View style={{ flex: 1, padding: 8, borderWidth: 1, borderColor: '#ddd' }}>
    <View>
      <Pressable onPress={() => onPress(book.id)}>
        <Image source={{ uri: book.cover }} style={{ width: '100%', aspectRatio: 2 / 3 }} />
      </Pressable>
      <FavoriteButton book={book} />
    </View>
    <Pressable onPress={() => onPress(book.id)}>
      <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>{book.title}</Text>
      <Text>{formatVND(book.price)}</Text>
      <Text>{book.stock === 0 ? 'Hết hàng' : `Còn ${book.stock}`}</Text>
    </Pressable>
    <Pressable disabled={book.stock === 0} onPress={() => dispatch(addToCart(book))}
      style={{ padding: 8, backgroundColor: book.stock === 0 ? '#aaa' : '#ddd', marginTop: 5 }}>
      <Text style={{ textAlign: 'center' }}>Thêm vào giỏ</Text>
    </Pressable>
  </View>;
}
