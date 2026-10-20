import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { CartItem, User } from "../mockData";

interface CartAndCheckoutScreenProps {
  currentUser: User | null;
  cartItems: CartItem[];
  currentMode: "cart" | "checkout";
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemoveItem: (bookId: string) => void;
  onRequireLoginForCheckout: () => void;
  onProceedToCheckout: () => void;
  onBackToCart: () => void;
  onOrderSuccess: () => void;
  onNavigateHome: () => void;
}

export default function CartAndCheckoutScreen({
  currentUser,
  cartItems,
  currentMode,
  onUpdateQuantity,
  onRemoveItem,
  onRequireLoginForCheckout,
  onProceedToCheckout,
  onBackToCart,
  onOrderSuccess,
  onNavigateHome,
}: CartAndCheckoutScreenProps) {
  const [phone, setPhone] = useState("0912345678");
  const [address, setAddress] = useState("12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  // Bài tập 2: Chưa đăng nhập mà bấm Thanh toán -> điều hướng sang màn Đăng nhập, đăng nhập xong quay lại đúng Checkout
  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      Alert.alert("Thông báo", "Giỏ hàng đang trống!");
      return;
    }

    if (!currentUser) {
      // Chưa đăng nhập mà bấm Thanh toán -> điều hướng ngay sang Đăng nhập
      onRequireLoginForCheckout();
      return;
    }

    // Đã đăng nhập -> đi thẳng vào màn hình Checkout
    onProceedToCheckout();
  };

  const handleConfirmOrder = () => {
    if (!address.trim() || !phone.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập số điện thoại và địa chỉ nhận hàng.");
      return;
    }

    Alert.alert(
      "Thành công",
      `Đơn hàng trị giá ${totalAmount.toLocaleString("vi-VN")} đ của ${currentUser?.name || "bạn"} đã được tạo thành công!`,
      [{ text: "OK", onPress: onOrderSuccess }]
    );
  };

  // GIAO DIỆN THANH TOÁN (CHECKOUT)
  if (currentMode === "checkout") {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Thanh toán đơn hàng</Text>
        {currentUser && (
          <Text style={styles.badgeSuccess}>
            Người nhận: {currentUser.name} ({currentUser.email})
          </Text>
        )}

        <View style={styles.card}>
          <Text style={styles.subTitle}>Thông tin nhận hàng</Text>
          <Text style={styles.label}>Người nhận: {currentUser?.name || ""}</Text>
          <Text style={styles.label}>Email: {currentUser?.email || ""}</Text>

          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Địa chỉ giao hàng:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.subTitle}>Sách đặt mua</Text>
          {cartItems.map((item) => (
            <View key={item.book.id} style={styles.rowBetween}>
              <Text style={{ flex: 1 }}>{item.book.title} (x{item.quantity})</Text>
              <Text style={{ fontWeight: "bold" }}>
                {(item.book.price * item.quantity).toLocaleString("vi-VN")} đ
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.rowBetween}>
            <Text style={styles.boldText}>Tổng thanh toán:</Text>
            <Text style={styles.priceText}>{totalAmount.toLocaleString("vi-VN")} đ</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnSuccess} onPress={handleConfirmOrder}>
          <Text style={styles.btnText}>Xác nhận đặt hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={onBackToCart}>
          <Text style={styles.btnSecondaryText}>← Quay lại giỏ hàng</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // GIAO DIỆN GIỎ HÀNG
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.text}>Giỏ hàng đang trống.</Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={onNavigateHome}>
            <Text style={styles.btnText}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {cartItems.map((item) => (
            <View key={item.book.id} style={styles.cartItem}>
              <Image source={{ uri: item.book.cover }} style={styles.thumb} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.boldText}>{item.book.title}</Text>
                <Text style={styles.priceText}>{item.book.price.toLocaleString("vi-VN")} đ</Text>

                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => onUpdateQuantity(item.book.id, -1)}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNum}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => onUpdateQuantity(item.book.id, 1)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => onRemoveItem(item.book.id)}
                  >
                    <Text style={{ color: "red", fontSize: 13 }}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.boldText}>Tổng cộng:</Text>
              <Text style={styles.priceText}>{totalAmount.toLocaleString("vi-VN")} đ</Text>
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={handleCheckoutClick}>
              <Text style={styles.btnText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: "#333",
    marginTop: 6,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  cartItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  thumb: {
    width: 60,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#d9534f",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  qtyNum: {
    marginHorizontal: 12,
    fontWeight: "bold",
  },
  deleteBtn: {
    marginLeft: "auto",
    padding: 4,
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  btnSuccess: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  btnSecondary: {
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  btnSecondaryText: {
    color: "#007bff",
    fontSize: 14,
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  badgeSuccess: {
    color: "#155724",
    backgroundColor: "#d4edda",
    padding: 8,
    borderRadius: 4,
    fontSize: 13,
    marginBottom: 12,
  },
  hintText: {
    color: "#856404",
    fontSize: 12,
    marginTop: 6,
    fontStyle: "italic",
    textAlign: "center",
  },
  emptyBox: {
    padding: 30,
    alignItems: "center",
  },
});
