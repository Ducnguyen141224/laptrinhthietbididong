import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

// Generic Interface
interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

// Kiểu dữ liệu Product
interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Pagination() {
  const [response, setResponse] = useState<ApiResponse<Product>>({
    data: [],
    total: 0,
    page: 1,
  });

  const loadProducts = () => {
    // Giả lập dữ liệu API trả về
    const result: ApiResponse<Product> = {
      data: [
        { id: 1, name: 'Điện thoại', price: 12000000 },
        { id: 2, name: 'Laptop', price: 20000000 },
        { id: 3, name: 'Tai nghe', price: 1500000 },
      ],
      total: 3,
      page: 1,
    };

    setResponse(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Danh sách sản phẩm
      </Text>

      <Text style={styles.info}>
        Trang: {response.page}
      </Text>

      <Text style={styles.info}>
        Tổng sản phẩm: {response.total}
      </Text>

      <Button
        title="Tải sản phẩm"
        onPress={loadProducts}
      />

      <FlatList
        data={response.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>
              {item.name}
            </Text>

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

  info: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
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