import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

// Mock data & Types
import {
  Book,
  Review,
  User,
  CartItem,
  INITIAL_BOOKS,
  INITIAL_REVIEWS,
  calculateAverageRating,
} from "./mockData";

// Screens (Chỉ 4 màn hình chính gọn gàng)
import HomeScreen from "./screens/HomeScreen";
import BookDetailScreen from "./screens/BookDetailScreen";
import AuthScreen from "./screens/AuthScreen";
import CartAndCheckoutScreen from "./screens/CartAndCheckoutScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

function MainApp() {
  // ========================================================
  // STATE CHÍNH CỦA ỨNG DỤNG
  // ========================================================
  const [loadingApp, setLoadingApp] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Điều hướng màn hình
  type ScreenType = "home" | "detail" | "cart" | "account" | "checkout";
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [selectedBook, setSelectedBook] = useState<Book>(INITIAL_BOOKS[0]);

  // Cờ chuyển tiếp Bài tập 2: Khi chưa đăng nhập mà bấm Checkout
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);

  // Dữ liệu sách & reviews (Bài tập 3)
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [reviewsMap, setReviewsMap] =
    useState<Record<string, Review[]>>(INITIAL_REVIEWS);

  // Giỏ hàng
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { book: INITIAL_BOOKS[0], quantity: 1 },
  ]);

  /**
   * ========================================================
   * BÀI TẬP 2: TỰ ĐỘNG ĐĂNG NHẬP (AUTO-LOGIN)
   * Khi mở app, đọc AsyncStorage để kiểm tra token và khôi phục
   * ========================================================
   */
  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("@user_token");
        const savedUserStr = await AsyncStorage.getItem("@user_info");

        if (savedToken && savedUserStr) {
          const userObj: User = JSON.parse(savedUserStr);
          setCurrentUser(userObj);
          console.log("Auto-login thành công với user:", userObj.email);
        }
      } catch (err) {
        console.warn("Lỗi kiểm tra auto-login:", err);
      } finally {
        // Delay nhẹ để người dùng thấy Splash kiểm tra tự động đăng nhập
        setTimeout(() => {
          setLoadingApp(false);
        }, 600);
      }
    };

    checkAutoLogin();
  }, []);

  /**
   * ========================================================
   * BÀI TẬP 2: ĐĂNG XUẤT (LOGOUT)
   * Xóa token và user khỏi AsyncStorage
   * ========================================================
   */
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@user_token");
      await AsyncStorage.removeItem("@user_info");
      setCurrentUser(null);
      setRedirectToCheckout(false);

      if (currentScreen === "checkout") {
        setCurrentScreen("home");
      }
      Alert.alert("Đăng xuất", "Đã đăng xuất thành công!");
    } catch (e) {
      console.warn("Lỗi khi đăng xuất:", e);
    }
  };

  // Thêm đánh giá mới (Bài tập 3)
  const handleAddReview = (bookId: string, review: Review) => {
    const currentList = reviewsMap[bookId] || [];
    const updatedList = [review, ...currentList];

    setReviewsMap({
      ...reviewsMap,
      [bookId]: updatedList,
    });

    // Cập nhật lại điểm trung bình sao của cuốn sách
    const newAvg = calculateAverageRating(updatedList);
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, rating: newAvg } : b))
    );
    if (selectedBook.id === bookId) {
      setSelectedBook((prev) => ({ ...prev, rating: newAvg }));
    }
  };

  // Giỏ hàng
  const handleAddToCart = (book: Book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    Alert.alert("Thành công", `Đã thêm "${book.title}" vào giỏ hàng!`);
  };

  const handleUpdateQuantity = (bookId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (bookId: string) => {
    setCartItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  /**
   * ========================================================
   * BÀI TẬP 2: BẢO VỆ CHECKOUT KHI MUA NGAY / THANH TOÁN
   * ========================================================
   */
  const handleBuyNow = (book: Book) => {
    // Đảm bảo sách có trong giỏ
    const exists = cartItems.some((item) => item.book.id === book.id);
    if (!exists) {
      setCartItems((prev) => [...prev, { book, quantity: 1 }]);
    }

    if (!currentUser) {
      // Chưa đăng nhập mà bấm Mua ngay/Thanh toán -> điều hướng sang Đăng nhập, đăng nhập xong quay lại Checkout
      setRedirectToCheckout(true);
      setCurrentScreen("account");
    } else {
      // Đã login -> vào thẳng Checkout
      setCurrentScreen("checkout");
    }
  };

  // Màn hình Splash kiểm tra Auto-login (Bài tập 2)
  if (loadingApp) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.splashTitle}>BookStore</Text>
        <Text style={styles.splashDesc}>
          Bài tập 2: Đang kiểm tra phiên đăng nhập tự động...
        </Text>
      </View>
    );
  }

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* VÙNG NỘI DUNG MÀN HÌNH CHÍNH */}
      <View style={styles.content}>
        {currentScreen === "home" && (
          <HomeScreen
            books={books}
            currentUser={currentUser}
            totalCartItems={totalCartCount}
            onSelectBook={(book) => {
              setSelectedBook(book);
              setCurrentScreen("detail");
            }}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onNavigateAuth={() => setCurrentScreen("account")}
            onNavigateCart={() => setCurrentScreen("cart")}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === "detail" && (
          <BookDetailScreen
            book={selectedBook}
            allBooks={books}
            currentUser={currentUser}
            reviews={reviewsMap[selectedBook.id] || []}
            onAddReview={handleAddReview}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectBook={(book) => setSelectedBook(book)}
            onNavigateLogin={() => setCurrentScreen("account")}
            onBack={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "cart" && (
          <CartAndCheckoutScreen
            currentUser={currentUser}
            cartItems={cartItems}
            currentMode="cart"
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onRequireLoginForCheckout={() => {
              setRedirectToCheckout(true);
              setCurrentScreen("account");
            }}
            onProceedToCheckout={() => setCurrentScreen("checkout")}
            onBackToCart={() => setCurrentScreen("cart")}
            onOrderSuccess={() => {
              setCartItems([]);
              setCurrentScreen("home");
            }}
            onNavigateHome={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "checkout" && (
          <CartAndCheckoutScreen
            currentUser={currentUser}
            cartItems={cartItems}
            currentMode="checkout"
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onRequireLoginForCheckout={() => {
              setRedirectToCheckout(true);
              setCurrentScreen("account");
            }}
            onProceedToCheckout={() => setCurrentScreen("checkout")}
            onBackToCart={() => setCurrentScreen("cart")}
            onOrderSuccess={() => {
              setCartItems([]);
              setCurrentScreen("home");
            }}
            onNavigateHome={() => setCurrentScreen("home")}
          />
        )}

        {currentScreen === "account" && (
          <AuthScreen
            currentUser={currentUser}
            redirectToCheckout={redirectToCheckout}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              if (redirectToCheckout) {
                setRedirectToCheckout(false);
                setCurrentScreen("checkout");
              } else {
                setCurrentScreen("home");
              }
            }}
            onLogout={handleLogout}
            onNavigateHome={() => setCurrentScreen("home")}
            onNavigateCheckout={() => {
              setRedirectToCheckout(false);
              setCurrentScreen("checkout");
            }}
          />
        )}
      </View>

      {/* THANH ĐIỀU HƯỚNG DƯỚI CÙNG (BOTTOM TAB BAR) */}
      {currentScreen !== "checkout" && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentScreen("home")}
          >
            <Feather
              name="home"
              size={20}
              color={currentScreen === "home" ? "#2563eb" : "#64748b"}
            />
            <Text
              style={[
                styles.tabLabel,
                currentScreen === "home" && styles.tabLabelActive,
              ]}
            >
              Trang chủ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentScreen("detail")}
          >
            <Feather
              name="book-open"
              size={20}
              color={currentScreen === "detail" ? "#2563eb" : "#64748b"}
            />
            <Text
              style={[
                styles.tabLabel,
                currentScreen === "detail" && styles.tabLabelActive,
              ]}
            >
              Chi tiết
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentScreen("cart")}
          >
            <View style={styles.cartIconWrapper}>
              <Feather
                name="shopping-cart"
                size={20}
                color={currentScreen === "cart" ? "#2563eb" : "#64748b"}
              />
              {totalCartCount > 0 && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{totalCartCount}</Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.tabLabel,
                currentScreen === "cart" && styles.tabLabelActive,
              ]}
            >
              Giỏ hàng
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentScreen("account")}
          >
            <Feather
              name="user"
              size={20}
              color={currentScreen === "account" ? "#2563eb" : "#64748b"}
            />
            <Text
              style={[
                styles.tabLabel,
                currentScreen === "account" && styles.tabLabelActive,
              ]}
            >
              {currentUser ? "Tài khoản" : "Đăng nhập"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  splashTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  splashDesc: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  bottomBar: {
    flexDirection: "row",
    height: 52,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cartIconWrapper: {
    position: "relative",
  },
  tabBadge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  tabBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
  tabLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  tabLabelActive: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
