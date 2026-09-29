import React, { useCallback, useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Switch,
  Alert,
  RefreshControl,
} from "react-native";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import ProductCard, {Product} from "./components/ProductCard";

const API_URL ="https://6aba25b55b549d818d620785.mockapi.io/products/products";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [isTile, setIsTile] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const numColumns = isTile ? 2 : 1;

  

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Không thể tải sản phẩm");
      }

      const data = await response.json();

      setProducts(data as Product[]);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleSelect = useCallback(
    (id: string) => {
      const product = products.find(
        (item) => item.id === id
      );

      if (product) {
        Alert.alert("Sản phẩm", product.name);
      }
    },
    [products]
  );


  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchProducts();

    setRefreshing(false);
  };


  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.center}>
          <ActivityIndicator size="large" />

          <Text>Đang tải dữ liệu...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>
            Product App
          </Text>

          <View style={styles.switchContainer}>
            <Text>Dạng lưới</Text>

            <Switch
              value={isTile}
              onValueChange={setIsTile}
            />
          </View>
        </View>

        <FlatList
          key={String(numColumns)}
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}

          renderItem={({ item }) => (
            <ProductCard
              product={item}
              layout={isTile ? "tile" : "row"}
              onSelect={handleSelect}
            />
          )}

          columnWrapperStyle={
            isTile ? styles.columnWrapper : undefined
          }

          contentContainerStyle={styles.list}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  header: {
    backgroundColor: "white",
    padding: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  list: {
    padding: 10,
  },

  columnWrapper: {
    justifyContent: "space-between",
    gap: 10,
  },
});