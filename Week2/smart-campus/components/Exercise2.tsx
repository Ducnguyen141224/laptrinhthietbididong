import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function Exercise2() {
    return (
        <ScrollView style={{ padding: 20, paddingTop: 50 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                Bảng điều khiển dành cho sinh viên
            </Text>

            <View
                style={{
                    borderWidth: 1,
                    padding: 15,
                    marginTop: 20,

                }}
            >
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    Thông báo quan trọng về lịch thi cuối học kỳ
                </Text>

                <Text style={{ fontSize: 18, marginTop: 10 }}>
                    Sinh viên vui lòng kiểm tra lại thời gian và địa điểm thi
                    để chuẩn bị tốt cho kỳ thi.
                </Text>
            </View>
        </ScrollView>
    );
}