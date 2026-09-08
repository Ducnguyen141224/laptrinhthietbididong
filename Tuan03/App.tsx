import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import TongHop from "./components/tonghop";
import Bai2_UseEffect from "./components/Bai2_UseEffect";
import Bai3_UseContext from "./components/Bai3_Context";
import Bai4_UseReducer from "./components/Bai4_UseReducer";
import Bai5_UseMemo from "./components/Bai5_UseMemo";
import Bai1_UseState from "./components/Bai1_UseState";

export default function App() {
  return (
    <>
   {/* <Bai1_UseState /> */}
      {/* <Bai2_UseEffect /> */}
      {/* <Bai3_UseContext /> */}
      {/* <Bai4_UseReducer /> */}
      {/* <Bai5_UseMemo /> */}
      <TongHop />
    </>
  );
}