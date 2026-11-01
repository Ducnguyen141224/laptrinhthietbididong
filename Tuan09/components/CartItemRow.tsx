import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import type { CartItem } from '../types';
import { formatVND } from '../utils/format';

type Props = {
  item: CartItem;
  quantity: number;
  onChangeQuantity: (id: string, quantity: number) => void;
  onRemove: (item: CartItem) => void;
};

export default function CartItemRow({ item, quantity, onChangeQuantity, onRemove }: Props) {
  const { book } = item;
  return <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd', gap: 10 }}>
    <Image source={{ uri: book.cover }} style={{ width: 65, height: 90 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold' }}>{book.title}</Text>
      <Text>{formatVND(book.price)}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 }}>
        <Pressable disabled={quantity <= 1} onPress={() => onChangeQuantity(book.id, quantity - 1)}>
          <Text style={{ fontSize: 22, color: quantity <= 1 ? '#aaa' : '#000' }}>−</Text>
        </Pressable>
        <Text>{quantity}</Text>
        <Pressable disabled={quantity >= book.stock} onPress={() => onChangeQuantity(book.id, quantity + 1)}>
          <Text style={{ fontSize: 22, color: quantity >= book.stock ? '#aaa' : '#000' }}>+</Text>
        </Pressable>
        <Text>Còn {book.stock}</Text>
      </View>
      <Text>Thành tiền: {formatVND(book.price * quantity)}</Text>
    </View>
    <Pressable onPress={() => onRemove(item)}><Text style={{ fontSize: 20 }}>✕</Text></Pressable>
  </View>;
}
