import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
};

type ProductCardProps = {
  product: Product;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};

function ProductCard({
  product,
  layout = "row",
  onSelect,
}: ProductCardProps) {
  const isTile = layout === "tile";

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(product.id)}
    >
      <View style={isTile ? styles.imageContainer : undefined}>
        <Image
          source={{ uri: product.image }}
          style={[styles.image, isTile && styles.imageTile]}
        />

        {isTile && (
          <Text style={styles.ratingTile}>
            ⭐ {product.rating.toFixed(1)}
          </Text>
        )}
      </View>

      <View style={styles.info}>
        <Text
          style={styles.name}
          numberOfLines={isTile ? 1 : undefined}
        >
          {product.name}
        </Text>

        {!isTile && (
          <>
            <Text>Loại: {product.category}</Text>

            <Text>
              Giá: {product.price.toLocaleString()} đ
            </Text>

            <Text>⭐ {product.rating.toFixed(1)}</Text>
          </>
        )}

        <Text>
          {product.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  cardTile: {
    flexDirection: "column",
    width: "48%",
    padding: 0,
    overflow: "hidden",
  },

  image: {
    width: 70,
    height: 100,
    borderRadius: 5,
  },

  imageContainer: {
    width: "100%",
    position: "relative",
  },

  imageTile: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },

  info: {
    flex: 1,
    padding: 10,
    gap: 5,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
  },

  ratingTile: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
});