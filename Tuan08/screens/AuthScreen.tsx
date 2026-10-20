import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../mockData";

interface AuthScreenProps {
  currentUser: User | null;
  redirectToCheckout?: boolean;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  onNavigateCheckout: () => void;
}

export default function AuthScreen({
  currentUser,
  redirectToCheckout = false,
  onLoginSuccess,
  onLogout,
  onNavigateHome,
  onNavigateCheckout,
}: AuthScreenProps) {
  // Tab: login | register (Bài tập 1)
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const validate = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError("Email không đúng định dạng (vd: user@gmail.com)");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password || password.length < 6) {
      setPasswordError("Mật khẩu phải tối thiểu 6 ký tự");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (tab === "register" && !name.trim()) {
      setNameError("Họ tên không được để trống");
      isValid = false;
    } else {
      setNameError("");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const fakeToken = "token_" + Date.now();
    const user: User = {
      id: "u_" + Date.now(),
      name: tab === "register" ? name.trim() : email.split("@")[0],
      email: email.trim(),
      token: fakeToken,
    };

    // Lưu AsyncStorage (Bài tập 1 & 2)
    await AsyncStorage.setItem("@user_token", fakeToken);
    await AsyncStorage.setItem("@user_info", JSON.stringify(user));

    Alert.alert("Thông báo", `${tab === "login" ? "Đăng nhập" : "Đăng ký"} thành công!`);
    onLoginSuccess(user);

    if (redirectToCheckout) {
      onNavigateCheckout();
    } else {
      onNavigateHome();
    }
  };

  // Màn hình khi đã đăng nhập (Bài tập 2: Đăng xuất)
  if (currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tài khoản</Text>
        <Text style={styles.textInfo}>Xin chào: {currentUser.name}</Text>
        <Text style={styles.textInfo}>Email: {currentUser.email}</Text>
        <Text style={styles.textInfo}>Token: {currentUser.token.slice(0, 20)}...</Text>

        <TouchableOpacity style={styles.btnDanger} onPress={onLogout}>
          <Text style={styles.btnText}>Đăng xuất (Bài tập 2)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={onNavigateHome}>
          <Text style={styles.btnSecondaryText}>Về trang chủ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Form Đăng nhập / Đăng ký (Bài tập 1)
  return (
    <View style={styles.container}>
      {redirectToCheckout && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            Vui lòng đăng nhập để tiếp tục thanh toán (Bài tập 2)
          </Text>
        </View>
      )}

      <Text style={styles.title}>
        {tab === "login" ? "Đăng nhập" : "Đăng ký tài khoản"}
      </Text>

      {/* Chuyển tab */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "login" && styles.tabActive]}
          onPress={() => setTab("login")}
        >
          <Text style={tab === "login" ? styles.tabTextActive : styles.tabText}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "register" && styles.tabActive]}
          onPress={() => setTab("register")}
        >
          <Text style={tab === "register" ? styles.tabTextActive : styles.tabText}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Họ tên nếu đăng ký */}
      {tab === "register" && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ và tên"
            value={name}
            onChangeText={setName}
          />
          {!!nameError && <Text style={styles.errorText}>{nameError}</Text>}
        </View>
      )}

      {/* Input Email */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </View>

      {/* Input Mật khẩu */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Tối thiểu 6 ký tự"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={handleSubmit}>
        <Text style={styles.btnText}>
          {tab === "login" ? "Đăng nhập" : "Đăng ký"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  alertBox: {
    backgroundColor: "#fff3cd",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  alertText: {
    color: "#856404",
    fontSize: 13,
    textAlign: "center",
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: "#007bff",
  },
  tabText: {
    color: "#666",
    fontSize: 15,
  },
  tabTextActive: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 15,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  btnDanger: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  btnSecondary: {
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnSecondaryText: {
    color: "#007bff",
    fontSize: 14,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textInfo: {
    fontSize: 15,
    marginBottom: 8,
    color: "#333",
  },
});
