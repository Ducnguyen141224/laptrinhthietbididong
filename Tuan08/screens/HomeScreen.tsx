import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Book, User } from "../mockData";
import { RatingStars } from "./BookDetailScreen";

interface HomeScreenProps {
  books: Book[];
  currentUser: User | null;
  totalCartItems: number;
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onBuyNow: (book: Book) => void;
  onNavigateAuth: () => void;
  onNavigateCart: () => void;
  onLogout: () => void;
}

export default function HomeScreen({
  books,
  currentUser,
  totalCartItems,
  onSelectBook,
  onAddToCart,
  onBuyNow,
  onNavigateAuth,
  onNavigateCart,
  onLogout,
}: HomeScreenProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const categories = useMemo(() => {
    return ["Tất cả", ...Array.from(new Set(books.map((b) => b.genre)))];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        selectedCategory === "Tất cả" || item.genre === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [books, search, selectedCategory]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>BookStore</Text>
          {currentUser ? (
            <Text style={styles.subText}>Xin chào: {currentUser.name}</Text>
          ) : (
            <Text style={styles.subText}>Chưa đăng nhập</Text>
          )}
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.cartBtn} onPress={onNavigateCart}>
            <Text style={styles.cartBtnText}>🛒 Giỏ ({totalCartItems})</Text>
          </TouchableOpacity>

          {currentUser ? (
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                Alert.alert("Đăng xuất", "Bạn có muốn đăng xuất không?", [
                  { text: "Hủy", style: "cancel" },
                  { text: "Đăng xuất", style: "destructive", onPress: onLogout },
                ]);
              }}
            >
              <Text style={styles.logoutBtnText}>Đăng xuất</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginBtn} onPress={onNavigateAuth}>
              <Text style={styles.loginBtnText}>Đăng nhập</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sách hoặc tác giả..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Danh mục */}
      <View style={styles.catWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.catChip,
                selectedCategory === item && styles.catChipActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={
                  selectedCategory === item
                    ? styles.catTextActive
                    : styles.catText
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Danh sách sách */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookCard}
            onPress={() => onSelectBook(item)}
          >
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.genreText}>{item.genre}</Text>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.authorText}>Tác giả: {item.author}</Text>

              <View style={styles.row}>
                <RatingStars value={item.rating} size={12} />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>

              <Text style={styles.priceText}>
                {item.price.toLocaleString("vi-VN")} đ
              </Text>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.smallBtnOutline}
                  onPress={() => onAddToCart(item)}
                >
                  <Text style={styles.smallBtnOutlineText}>+ Giỏ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.smallBtnPrimary}
                  onPress={() => onBuyNow(item)}
                >
                  <Text style={styles.smallBtnPrimaryText}>Mua ngay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 12,
    color: "#666",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cartBtn: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  cartBtnText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  loginBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 4,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  logoutBtn: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#dc3545",
    borderRadius: 4,
  },
  logoutBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 13,
    marginBottom: 8,
  },
  catWrapper: {
    marginBottom: 8,
  },
  catChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 14,
    marginRight: 6,
  },
  catChipActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  catText: {
    fontSize: 12,
    color: "#333",
  },
  catTextActive: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  bookCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  genreText: {
    fontSize: 10,
    color: "#007bff",
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 1,
  },
  authorText: {
    fontSize: 11,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  ratingText: {
    fontSize: 11,
    color: "#b45309",
    marginLeft: 4,
  },
  priceText: {
    fontSize: 13,
    color: "#d9534f",
    fontWeight: "bold",
  },
  btnRow: {
    flexDirection: "row",
    marginTop: 4,
    gap: 6,
  },
  smallBtnOutline: {
    borderWidth: 1,
    borderColor: "#007bff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  smallBtnOutlineText: {
    color: "#007bff",
    fontSize: 11,
    fontWeight: "bold",
  },
  smallBtnPrimary: {
    backgroundColor: "#007bff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  smallBtnPrimaryText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
});
