import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function ProductSearch() {
  const [keyword, setKeyword] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = (keyword: string, limit: number) => {
    fetch(
      `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`
    )
      .then(response => response.json())
      .then(data => {
        const result = data.products as Product[];
        setProducts(result);
      })
      .catch(error => {
        console.log('Lỗi:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tìm kiếm sản phẩm</Text>

      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên sản phẩm"
        placeholderTextColor="#777"
      />

      <Button
        title="Tìm kiếm"
        onPress={() => fetchProducts(keyword, 10)}
      />

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.price}>
              Giá: ${item.price}
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
    borderColor: '#999999',
    borderRadius: 8,
    padding: 10,
    color: '#000000',
    marginBottom: 10,
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },

  title: {
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