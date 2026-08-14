import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

export default function Exercise9() {
    const [hoTen, setHoTen] = useState("");
    const [maSinhVien, setMaSinhVien] = useState("");
    const [email, setEmail] = useState("");
    const [tomTat, setTomTat] = useState("");

    const [loi, setLoi] = useState<string[]>([]);

    function kiemTra() {
        const danhSachLoi: string[] = [];

        if (hoTen.trim() === "") {
            danhSachLoi.push("Họ và tên không được để trống.");
        }

        if (!/^[0-9]+$/.test(maSinhVien)) {
            danhSachLoi.push("Mã sinh viên chỉ được chứa chữ số.");
        }

        if (!email.includes("@")) {
            danhSachLoi.push("Email phải có định dạng hợp lệ, ví dụ: abc@gmail.com.");
        }

        if (tomTat.length > 100) {
            danhSachLoi.push("Nội dung tóm tắt không được vượt quá 100 ký tự.");
        }

        setLoi(danhSachLoi);
    }

    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                paddingTop: 60,
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Kiểm tra thông tin
            </Text>

            <TextInput
                placeholder="Họ và tên"
                value={hoTen}
                onChangeText={setHoTen}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginTop: 20,
                }}
            />

            <TextInput
                placeholder="Mã sinh viên"
                value={maSinhVien}
                onChangeText={setMaSinhVien}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginTop: 10,
                }}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginTop: 10,
                }}
            />

            <TextInput
                placeholder="Tóm tắt"
                value={tomTat}
                onChangeText={setTomTat}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginTop: 10,
                }}
            />

            <Pressable
                onPress={kiemTra}
                style={{
                    borderWidth: 1,
                    padding: 12,
                    marginTop: 15,
                }}
            >
                <Text style={{ textAlign: "center" }}>
                    Kiểm tra
                </Text>
            </Pressable>

            {loi.map((item, index) => (
                <Text
                    key={index}
                    style={{
                        marginTop: 8,
                        color: "red"
                    }}
                >
                    {item}
                </Text>
            ))}
        </View>
    );
}