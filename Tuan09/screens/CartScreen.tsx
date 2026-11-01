import React, { useCallback, useMemo, useState } from 'react';
import { Alert, View, Text, TextInput, Button, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store';
import { selectCartItems, removeFromCart } from '../store/cartSlice';
import { useDebouncedQuantities } from '../hooks/useDebouncedQuantities';
import CartItemRow from '../components/CartItemRow';
import type { CartItem } from '../types';
import { formatVND } from '../utils/format';

const COUPONS = {
  SALE10: (s: number) => Math.round(s * 0.1),
  BOOK50K: (s: number) => s >= 200000 ? 50000 : 0,
};

export default function CartScreen() {
  const items = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const { drafts, changeQuantity, discard, flush } = useDebouncedQuantities(300);
  const [input, setInput] = useState('');
  const [coupon, setCoupon] = useState<keyof typeof COUPONS | null>(null);

  // Lưu những thao tác chưa đủ 300ms khi chuyển tab.
  useFocusEffect(useCallback(() => () => flush(), [flush]));
  const qtyOf = useCallback((i: CartItem) => drafts[i.book.id] ?? i.quantity, [drafts]);
  const subtotal = useMemo(() => items.reduce((n, i) => n + i.book.price * qtyOf(i), 0), [items, qtyOf]);
  const discount = coupon ? Math.min(COUPONS[coupon](subtotal), subtotal) : 0;
  const total = subtotal - discount;

  const confirmRemove = (item: CartItem) => Alert.alert('Xoá sản phẩm', `Xoá "${item.book.title}"?`, [
    { text: 'Huỷ', style: 'cancel' },
    { text: 'Xoá', style: 'destructive', onPress: () => {
      discard(item.book.id); dispatch(removeFromCart(item.book.id));
    } },
  ]);

  const applyCoupon = () => {
    const code = input.trim().toUpperCase();
    if (code === 'SALE10' || code === 'BOOK50K') setCoupon(code);
    else { setCoupon(null); Alert.alert('Mã không hợp lệ', 'Thử SALE10 hoặc BOOK50K'); }
  };

  return <View style={{ flex: 1 }}>
    <FlatList data={items} keyExtractor={i => i.book.id}
      renderItem={({ item }) => <CartItemRow item={item} quantity={qtyOf(item)}
        onChangeQuantity={changeQuantity} onRemove={confirmRemove} />}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>Giỏ hàng trống</Text>}
    />
    <View style={{ padding: 12, borderTopWidth: 1, borderColor: '#ddd', gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput placeholder="SALE10 hoặc BOOK50K" value={input} onChangeText={setInput}
          autoCapitalize="characters" style={{ flex: 1, borderWidth: 1, borderColor: '#aaa', padding: 7 }} />
        <Button title="Áp dụng" onPress={applyCoupon} />
      </View>
      {coupon && <Button title={`Bỏ mã ${coupon}`} onPress={() => { setCoupon(null); setInput(''); }} />}
      <Text>Tạm tính: {formatVND(subtotal)}</Text>
      {coupon && <Text>Giảm giá: -{formatVND(discount)}</Text>}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tổng cộng: {formatVND(total)}</Text>
    </View>
  </View>;
}
