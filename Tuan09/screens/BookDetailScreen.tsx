import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import type { Book } from '../types';
import { fetchBookById } from '../api/books';
import { formatVND } from '../utils/format';
import FavoriteButton from '../components/FavoriteButton';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/cartSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;
export default function BookDetailScreen({ route }: Props) {
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    let active = true;
    fetchBookById(route.params.bookId)
      .then(b => { if (active) setBook(b); })
      .catch(e => { if (active) setError(String(e)); });
    return () => { active = false; };
  }, [route.params.bookId]);

  if (error) return <Text>Lỗi: {error}</Text>;
  if (!book) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
    <View>
      <Image source={{ uri: book.cover }} style={{ width: '100%', height: 320 }} resizeMode="contain" />
      <FavoriteButton book={book} />
    </View>
    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{book.title}</Text>
    <Text>Tác giả: {book.author}</Text>
    <Text>Thể loại: {book.category} | Đánh giá: {book.rating}/10</Text>
    <Text>Giá: {formatVND(book.price)}</Text>
    <Text>{book.stock === 0 ? 'Hết hàng' : `Còn ${book.stock} cuốn`}</Text>
    <Text>{book.description}</Text>
    <Button title="Thêm vào giỏ" disabled={book.stock === 0}
      onPress={() => dispatch(addToCart(book))} />
  </ScrollView>;
}
