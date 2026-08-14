import React from "react";
import { View, Text } from "react-native";

function TheKhoaHoc() {
    return (
        <View
            style={{
                borderWidth: 1,
                padding: 10,
                marginTop: 10,
            }}
        >
            <Text>Phát triển ứng dụng di động</Text>
        </View>
    );
}

export default function Exercise1() {
    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                paddingTop: 40,
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                }}
            >
                Bảng điều khiển sinh viên
            </Text>

            <Text style={{ marginTop: 20 }}>
                Khóa học
            </Text>

            <TheKhoaHoc />
            <TheKhoaHoc />

            <Text style={{ marginTop: 20 }}>
                Thông báo
            </Text>

            <View
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginTop: 10,
                }}
            >
                <Text>Lịch thi cuối kỳ đã được cập nhật</Text>
            </View>
        </View>
    );
}