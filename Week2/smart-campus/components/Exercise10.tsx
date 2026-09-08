import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
} from "react-native";

export default function Exercise10() {
    const [daChon, setDaChon] = useState(false);

    return (
        <ScrollView
            contentContainerStyle={{
                padding: 20,
                paddingTop: 50,
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
                accessibilityRole="header"
            >
                Bảng điều khiển sinh viên
            </Text>

            <TextInput
                placeholder="Tìm kiếm thông báo"
                accessibilityLabel="Ô tìm kiếm thông báo"
                style={{
                    borderWidth: 1,
                    padding: 12,
                    fontSize: 18,
                    marginBottom: 15,
                }}
            />

            <Pressable
                onPress={() => setDaChon(!daChon)}
                accessibilityRole="button"
                accessibilityLabel="Đăng ký khóa học"
                accessibilityState={{
                    selected: daChon,
                }}
                style={{
                    borderWidth: 1,
                    padding: 15,
                    marginBottom: 15,
                    minHeight: 50,
                }}
            >
                <Text style={{ fontSize: 18 }}>
                    {daChon ? "Đã đăng ký" : "Đăng ký khóa học"}
                </Text>
            </Pressable>

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 10,
                }}
                accessibilityRole="header"
            >
                Thông báo
            </Text>

            <View
                accessible={true}
                accessibilityLabel="Thông báo lịch thi cuối kỳ"
                style={{
                    borderWidth: 1,
                    padding: 15,
                    marginBottom: 10,
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Lịch thi cuối kỳ
                </Text>

                <Text style={{ fontSize: 18, marginTop: 8 }}>
                    Lịch thi cuối kỳ đã được cập nhật.
                </Text>
            </View>
        </ScrollView>
    );
}