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
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Book, Review, User, calculateAverageRating } from "../mockData";

// ==========================================
// Component RatingStars tái sử dụng (Bài tập 3)
// ==========================================
interface RatingStarsProps {
  value: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function RatingStars({
  value,
  size = 18,
  interactive = false,
  onRatingChange,
}: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.starsRow}>
      {stars.map((star) => {
        let iconName: "star" | "star-half" | "star-outline" = "star-outline";
        if (value >= star) {
          iconName = "star";
        } else if (value >= star - 0.5) {
          iconName = "star-half";
        }

        const icon = (
          <Ionicons
            key={star}
            name={iconName}
            size={size}
            color="#f59e0b"
            style={{ marginHorizontal: 1 }}
          />
        );

        if (interactive && onRatingChange) {
          return (
            <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
              {icon}
            </TouchableOpacity>
          );
        }
        return icon;
      })}
    </View>
  );
}

// ==========================================
// Màn hình Chi tiết sách (BookDetailScreen)
// ==========================================
interface BookDetailScreenProps {
  book: Book;
  allBooks: Book[];
  currentUser: User | null;
  reviews: Review[];
  onAddReview: (bookId: string, review: Review) => void;
  onAddToCart: (book: Book) => void;
  onBuyNow: (book: Book) => void;
  onSelectBook: (book: Book) => void;
  onNavigateLogin: () => void;
  onBack: () => void;
}

export default function BookDetailScreen({
  book,
  allBooks,
  currentUser,
  reviews,
  onAddReview,
  onAddToCart,
  onBuyNow,
  onSelectBook,
  onNavigateLogin,
  onBack,
}: BookDetailScreenProps) {
  // Bài tập 3: Form đánh giá
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>("");

  const avgRating = calculateAverageRating(reviews);

  // Thử thách: Sách liên quan cùng thể loại
  const relatedBooks = allBooks.filter(
    (item) => item.genre === book.genre && item.id !== book.id
  );

  const handleSubmitReview = () => {
    if (!currentUser) {
      Alert.alert("Yêu cầu đăng nhập", "Bạn cần đăng nhập để gửi đánh giá.");
      onNavigateLogin();
      return;
    }

    if (!newComment.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập nội dung đánh giá");
      return;
    }

    const reviewItem: Review = {
      id: "rev_" + Date.now(),
      userName: currentUser.name,
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    onAddReview(book.id, reviewItem);
    setNewComment("");
    setNewRating(5);
    Alert.alert("Thành công", "Đánh giá của bạn đã được ghi nhận!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>← Quay lại danh sách</Text>
      </TouchableOpacity>

      {/* Thông tin chính */}
      <View style={styles.headerCard}>
        <Image source={{ uri: book.cover }} style={styles.cover} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.genreBadge}>{book.genre}</Text>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>Tác giả: {book.author}</Text>

          {/* Bài tập 3: Điểm trung bình */}
          <View style={styles.row}>
            <RatingStars value={avgRating} size={16} />
            <Text style={styles.ratingText}>{avgRating} ({reviews.length} đánh giá)</Text>
          </View>

          <Text style={styles.price}>{book.price.toLocaleString("vi-VN")} đ</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => onAddToCart(book)}
            >
              <Text style={styles.btnOutlineText}>+ Giỏ hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => onBuyNow(book)}
            >
              <Text style={styles.btnText}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Giới thiệu nội dung */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Giới thiệu nội dung</Text>
        <Text style={styles.descText}>{book.description}</Text>
      </View>

      {/* ======================================= */}
      {/* BÀI TẬP 3: ĐÁNH GIÁ & XẾP HẠNG SAO     */}
      {/* ======================================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Đánh giá & Bình luận (Bài tập 3)
        </Text>

        {currentUser ? (
          <View style={styles.reviewBox}>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={{ fontSize: 13, marginRight: 8 }}>Chọn số sao:</Text>
              <RatingStars
                value={newRating}
                size={22}
                interactive={true}
                onRatingChange={setNewRating}
              />
              <Text style={{ fontWeight: "bold", marginLeft: 6 }}>{newRating} sao</Text>
            </View>

            <TextInput
              style={styles.inputComment}
              placeholder="Nhập nhận xét của bạn..."
              value={newComment}
              onChangeText={setNewComment}
            />

            <TouchableOpacity style={styles.btnSuccess} onPress={handleSubmitReview}>
              <Text style={styles.btnText}>Gửi đánh giá</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.reviewBox}>
            <Text style={{ fontSize: 13, marginBottom: 8, color: "#666" }}>
              Bạn cần đăng nhập để gửi nhận xét và chấm sao.
            </Text>
            <TouchableOpacity style={styles.btnOutline} onPress={onNavigateLogin}>
              <Text style={styles.btnOutlineText}>Đăng nhập để đánh giá</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Danh sách bình luận */}
        {reviews.map((rev) => (
          <View key={rev.id} style={styles.reviewItem}>
            <View style={styles.rowBetween}>
              <Text style={styles.reviewerName}>{rev.userName}</Text>
              <RatingStars value={rev.rating} size={12} />
            </View>
            <Text style={styles.commentText}>{rev.comment}</Text>
            <Text style={styles.dateText}>{rev.date}</Text>
          </View>
        ))}
      </View>

      {/* ======================================= */}
      {/* THỬ THÁCH: SÁCH LIÊN QUAN (Hàng ngang)  */}
      {/* ======================================= */}
      {relatedBooks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sách liên quan (Thử thách)</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={relatedBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.relatedCard}
                onPress={() => onSelectBook(item)}
              >
                <Image source={{ uri: item.cover }} style={styles.relatedThumb} />
                <Text style={styles.relatedTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.relatedPrice}>{item.price.toLocaleString("vi-VN")} đ</Text>
              </TouchableOpacity>
            )}
          />
        </View>
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
  starsRow: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    marginBottom: 10,
  },
  backBtnText: {
    color: "#007bff",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerCard: {
    flexDirection: "row",
    marginBottom: 16,
  },
  cover: {
    width: 100,
    height: 145,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  genreBadge: {
    color: "#007bff",
    fontSize: 11,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  author: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 6,
    color: "#b45309",
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d9534f",
    marginVertical: 6,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 8,
  },
  btnOutlineText: {
    color: "#007bff",
    fontSize: 12,
    fontWeight: "bold",
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  btnSuccess: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  section: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 12,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#444",
  },
  reviewBox: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  inputComment: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
    fontSize: 13,
    marginBottom: 8,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  reviewerName: {
    fontWeight: "bold",
    fontSize: 13,
  },
  commentText: {
    fontSize: 13,
    color: "#333",
    marginTop: 2,
  },
  dateText: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  relatedCard: {
    width: 95,
    marginRight: 10,
  },
  relatedThumb: {
    width: 95,
    height: 130,
    borderRadius: 4,
    backgroundColor: "#eee",
    marginBottom: 4,
  },
  relatedTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  relatedPrice: {
    fontSize: 11,
    color: "#d9534f",
    fontWeight: "bold",
  },
});
