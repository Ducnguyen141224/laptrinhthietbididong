import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

// Generic function
function filterByName<T extends { name: string }>(
  items: T[],
  keyword: string
): T[] {
  return items.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: 'Điện thoại', price: 12000000 },
  { id: 2, name: 'Laptop', price: 20000000 },
  { id: 3, name: 'Tai nghe', price: 1500000 },
  { id: 4, name: 'Chuột', price: 500000 },
];

export default function FilteredList() {
  const [keyword, setKeyword] = useState('');

  const filteredProducts = filterByName(products, keyword);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách sản phẩm</Text>

      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên cần tìm..."
        placeholderTextColor="#777"
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.price}>
              Giá: {item.price.toLocaleString('vi-VN')}đ
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    color: '#000000',
    marginBottom: 15,
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },

  price: {
    fontSize: 15,
    color: '#000000',
    marginTop: 5,
  },
});