import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAppSelector } from '../store';
import { selectWishlist } from '../store/wishlistSlice';

export default function AccountScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const count = useAppSelector(selectWishlist).length;
  return <View style={{ padding: 20, gap: 12 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tài khoản</Text>
    <Text>♥ Danh sách yêu thích: {count} sách</Text>
    <Button title="Xem sách yêu thích" onPress={() => navigation.navigate('Wishlist')} />
  </View>;
}
