import React from "react";
import { StyleSheet, View } from "react-native";

import Bai1Header from "./components/Bai1Header";
import Bai2BookCard from "./components/Bai2BookCard";
import Bai1Challenge from "./components/Bai1Challenge";

import Gio2Bai1Category from "./components/Gio2Bai1Category";
import Gio2Bai2BookGrid from "./components/Gio2Bai2BookGrid";
import Gio2Challenge from "./components/Gio2Challenge";

import Gio3Bai1Badge from "./components/Gio3Bai1Badge";
import Gio3Bai2FloatingCart from "./components/Gio3Bai2FloatingCart";
import Gio3Challenge from "./components/Gio3Challenge";

import Gio4Bai1Home from "./components/Gio4Bai1Home";
import Gio4Bai2BookDetail from "./components/Gio4Bai2BookDetail";

import Gio5Bai1BottomTab from "./components/Gio5Bai1BottomTab";
import Gio5Bai2Cart from "./components/Gio5Bai2Cart";

export default function App() {
  return (
    <View style={styles.container}>

      {/* Giờ 1 - Bài 1: Header */}
      <Bai1Header />

      {/* Giờ 1 - Bài 2: Book Card */}
      {/* <Bai2BookCard /> */}

      {/* Giờ 1 - Challenge */}
      {/* <Bai1Challenge /> */}


      {/* Giờ 2 - Bài 1: Category */}
      {/* <Gio2Bai1Category /> */}

      {/* Giờ 2 - Bài 2: Book Grid */}
      {/* <Gio2Bai2BookGrid /> */}

      {/* Giờ 2 - Challenge */}
      {/* <Gio2Challenge /> */}


      {/* Giờ 3 - Bài 1: Badge */}
      {/* <Gio3Bai1Badge /> */}

      {/* Giờ 3 - Bài 2: Floating Cart */}
      {/* <Gio3Bai2FloatingCart /> */}

      {/* Giờ 3 - Challenge */}
      {/* <Gio3Challenge /> */}


      {/* Giờ 4 - Bài 1: Home */}
      {/* <Gio4Bai1Home /> */}

      {/* Giờ 4 - Bài 2: Book Detail */}
      {/* <Gio4Bai2BookDetail /> */}


      {/* Giờ 5 - Bài 1: Bottom Tab */}
      {/* <Gio5Bai1BottomTab /> */}

      {/* Giờ 5 - Bài 2: Cart */}
      {/* <Gio5Bai2Cart /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});