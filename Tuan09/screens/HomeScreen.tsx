import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Book } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { fetchBooks } from '../api/books';
import BookGrid from '../components/BookGrid';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try { setError(''); setBooks(await fetchBooks()); }
    catch (e) { setError(e instanceof Error ? e.message : 'Lỗi kết nối'); }
  }, []);

  useEffect(() => { void load().finally(() => setLoading(false)); }, [load]);
  const refresh = async () => { setRefreshing(true); await load(); setRefreshing(false); };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error && books.length === 0) return <View style={{ padding: 20 }}>
    <Text>Không tải được sách: {error}</Text><Button title="Thử lại" onPress={() => void load()} />
  </View>;

  return <BookGrid books={books} refreshing={refreshing} onRefresh={refresh}
    onPressBook={id => navigation.navigate('BookDetail', { bookId: id })} />;
}
