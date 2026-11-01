import React from 'react';
import { View, Text, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAppSelector } from '../store';
import { selectWishlist } from '../store/wishlistSlice';
import BookGrid from '../components/BookGrid';

type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;
export default function WishlistScreen({ navigation }: Props) {
  const books = useAppSelector(selectWishlist);
  return <BookGrid books={books}
    onPressBook={id => navigation.navigate('BookDetail', { bookId: id })}
    ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 }}>
      <Text>Chưa có sách yêu thích</Text>
      <Button title="Khám phá sách" onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} />
    </View>}
  />;
}
